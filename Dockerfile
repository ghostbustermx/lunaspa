# syntax=docker/dockerfile:1
#
# Luna Spa: SPA de React (Vite) + CodeIgniter 4 servidos por un unico
# contenedor con nginx y php-fpm. Un solo contenedor evita tener que
# sincronizar un nginx externo con la imagen de PHP y deja la configuracion
# de fastcgi en un unico sitio.
#
# Etapas:
#   frontend -> compila react/ con Vite
#   vendor   -> composer install --no-dev
#   runtime  -> php-fpm + nginx con las extensiones que exige el proyecto
#
# Las extensiones no son opcionales: App\Libraries\ImageUpload convierte las
# fotos del blog a WebP con GD y valida el tipo real con finfo, asi que sin
# gd (con soporte WebP) el panel no puede subir imagenes.

# ---------------------------------------------------------------- frontend
FROM node:20-alpine AS frontend

WORKDIR /build

# El lock si existe: npm ci es reproducible y falla si el lock no cuadra.
COPY react/package.json react/package-lock.json ./
RUN npm ci

COPY react/ ./

# La SPA consume la API en el mismo dominio, asi que basta una ruta relativa.
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

RUN npm run build

# ---------------------------------------------------------------- php-base
# PHP con las dos extensiones que exige composer.json (ext-intl y
# ext-mbstring).
#
# Existe como etapa aparte, y no como un FROM directo, porque las dos imagenes
# que la necesitan dan problemas distintos:
#
#   composer:2             trae su propio PHP, pero sin intl ni mbstring, y
#                          composer install aborta con "ext-intl is missing"
#   php:8.2-fpm-alpine     tampoco las trae de serie
#
# Al compilar aqui y heredar de esta etapa en vendor y en runtime, composer
# valida la plataforma contra el mismo PHP que va a ejecutar la aplicacion, sin
# recurrir a --ignore-platform-req para tapar el aviso.
FROM php:8.2-fpm-alpine AS php-base

RUN set -eux; \
    apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        icu-dev \
        oniguruma-dev; \
    docker-php-ext-install -j"$(nproc)" intl mbstring; \
    apk add --no-cache icu-libs oniguruma; \
    apk del --no-network .build-deps

# ------------------------------------------------------------------ vendor
FROM php-base AS vendor

# Solo el binario de la imagen oficial; la imagen entera no hace falta. Es un
# phar de PHP, asi que funciona igual sobre Alpine que sobre Debian.
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN chmod +x /usr/bin/composer && composer --version --no-ansi

WORKDIR /build

# El lock se copia junto al composer.json a proposito: si falta, el build falla
# aqui con un error de COPY, que es justo lo que se quiere. Composer se
# ejecuta en modo install, que respeta el lock, y no en modo update.
COPY backend/composer.json backend/composer.lock ./

# Este proyecto usa el arranque manual de CI4 4.6+: system/ vive en el
# repositorio y el framework se autocarga desde ahi. De composer solo hacen
# falta psr/log y laminas/laminas-escaper, que app/Config/Autoload.php mapea a
# mano contra ROOTPATH/vendor. Son las dos unicas entradas de "packages" del
# lock; las 46 de "packages-dev" no llegan a instalarse por el --no-dev.
#
# Con el lock, el build es reproducible: sin el, cada reconstruccion resuelve
# las versiones mas recientes que puede y un dia falla por una dependencia que
# subio de version.
#
# --no-scripts es obligatorio: el post-autoload-dump de este composer.json
# ejecuta "composer update --working-dir=utils" y no existe ninguna carpeta
# utils/, asi que sin esta opcion el build revienta.
RUN composer install \
        --no-dev \
        --no-interaction \
        --no-scripts \
        --prefer-dist \
        --optimize-autoloader

# ----------------------------------------------------------------- runtime
FROM php-base AS runtime

# Dependencias de compilacion de las extensiones que faltan y las de ejecucion
# de nginx. intl y mbstring ya vienen de php-base, asi que no se reinstalan.
RUN set -eux; \
    apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        freetype-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        libwebp-dev; \
    docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp; \
    docker-php-ext-install -j"$(nproc)" \
        exif \
        gd \
        mysqli \
        opcache \
        pdo_mysql; \
    apk add --no-cache freetype libjpeg-turbo libpng libwebp; \
    apk del --no-network .build-deps; \
    apk add --no-cache nginx supervisor tzdata; \
    rm -rf /tmp/*

# Comprueba que las extensiones criticas cargan de verdad, no solo que estan
# instaladas. docker-php-ext-install escribe un .ini por extension, asi que una
# libreria de runtime que falte solo se detecta cuando PHP la carga; esto
# corta el build en lugar de dejar la web caida en produccion.
# opcache es extension de Zend, asi que se comprueba por funcion, no por nombre.
# El codigo va entre comillas simples y sin comillas simples dentro, porque el
# shell las consumiria y PHP recibiria la cadena truncada.
RUN set -eux; \
    php -r '$need = ["gd", "intl", "mbstring", "mysqli", "pdo_mysql", "exif"]; foreach ($need as $e) { if (!extension_loaded($e)) { fwrite(STDERR, "FALTA ext-" . $e . PHP_EOL); fwrite(STDERR, "cargadas: " . implode(", ", get_loaded_extensions()) . PHP_EOL); exit(1); } } if (!function_exists("opcache_get_status")) { fwrite(STDERR, "FALTA ext-opcache" . PHP_EOL); exit(1); }'

# Configuracion del servidor.
# nginx: se usa una config propia y se retira la de la distro para que no compita
# por el puerto 80.
COPY docker/nginx.conf /etc/nginx/nginx.conf
RUN rm -f /etc/nginx/conf.d/default.conf

# php-fpm: el pool que trae la imagen viene con clear_env=yes, que borra el
# entorno de los workers. Como toda la configuracion de CodeIgniter llega por
# variables de entorno (docker-compose), ese valor haria que getenv() devolviera
# false y la base de datos apuntara a 127.0.0.1 sin usuario.
COPY docker/php-fpm-www.conf /usr/local/etc/php-fpm.d/www.conf
COPY docker/php.ini /usr/local/etc/php/conf.d/zz-lunaspa.ini
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint

# Codigo de la aplicacion. El codigo va primero y vendor encima: si el host
# trajera un vendor/ de Windows (.dockerignore lo excluye, pero por si acaso)
# este COPY es el que manda.
COPY backend/ /var/www/backend
COPY --from=vendor /build/vendor /var/www/backend/vendor

# writable/ y public/uploads/ reciben volumenes, asi que se crean vacios con los
# permisos que necesita el usuario www-data. El .env nunca se copia: la
# configuracion entra unicamente por variables de entorno.
COPY --from=frontend /build/dist /var/www/html

# La foto de ejemplo del articulo se copia a /seed/uploads, fuera de
# public/uploads, porque el volumen tapa ese directorio: si la semilla se
# quedase dentro, el primer arranque montaria el volumen encima y el articulo se
# veria sin foto. El entrypoint la vuelca en el volumen solo si esta vacio.
#
# El comentario va aqui y no dentro del RUN porque Docker une las lineas de
# continuacion en una sola, y un "#" a mitad de esa linea haria que el shell
# comentase todo lo que venga despues: el cp y el chown se quedarian sin
# ejecutar y sin error visible.
RUN set -eux; \
    rm -f /var/www/backend/.env; \
    mkdir -p /var/www/backend/writable/cache \
             /var/www/backend/writable/logs \
             /var/www/backend/writable/session \
             /var/www/backend/writable/debugbar \
             /var/www/backend/writable/uploads \
             /var/www/backend/public/uploads/blog; \
    mkdir -p /seed; \
    cp -R /var/www/backend/public/uploads /seed/uploads; \
    chown -R www-data:www-data /var/www/backend/writable /var/www/backend/public/uploads; \
    chmod -R 775 /var/www/backend/writable /var/www/backend/public/uploads; \
    mkdir -p /run/nginx

EXPOSE 80

# Si la API no responde el contenedor se marca unhealthy y Nginx Proxy Manager lo
# muestra como caido en vez de servir un error de PHP al visitante.
HEALTHCHECK --interval=30s --timeout=5s --start-period=45s --retries=3 \
    CMD wget -qO- http://127.0.0.1/api/reviews >/dev/null 2>&1 || exit 1

ENTRYPOINT ["/usr/local/bin/entrypoint"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
