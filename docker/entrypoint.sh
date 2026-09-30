#!/bin/sh
# Entrypoint del contenedor "web".
#
# El contenedor arranca como root para poder corregir permisos, sembrar el
# volumen de uploads y ejecutar las migraciones. Lo que de verdad sirve
# peticiones corre como www-data (php-fpm) y nginx.
#
# En cuanto esto termina, exec deja el proceso 1 en manos de supervisord.

set -eu

APP_ROOT=/var/www/backend
SPA_ROOT=/var/www/html
UPLOADS_DIR="${APP_ROOT}/public/uploads"
SEED_UPLOADS=/seed/uploads

DB_HOST="${database.default.hostname:-db}"
DB_PORT="${database.default.port:-3306}"
DB_ATTEMPTS="${DB_WAIT_ATTEMPTS:-60}"

log() { printf '[entrypoint] %s\n' "$*"; }
err() { printf '[entrypoint] ERROR: %s\n' "$*" >&2; }

# --------------------------------------------------------------------------
# Escape hatch de configuracion de PHP sin reconstruir la imagen.
#
#   PHP_INI_OVERRIDES="session.cookie_secure = 0" docker compose up -d
#
# Se escribe al final de conf.d, que es donde se lee al arrancar php-fpm.
# Sirve, por ejemplo, para relajar session.cookie_secure si se prueba el panel
# por HTTP plano en lugar de por el dominio HTTPS.
# --------------------------------------------------------------------------
if [ -n "${PHP_INI_OVERRIDES:-}" ]; then
    log "aplicando PHP_INI_OVERRIDES"
    printf '%s\n' "$PHP_INI_OVERRIDES" > /usr/local/etc/php/conf.d/zz-env.ini
fi

# --------------------------------------------------------------------------
# Estructura de directorios escribibles.
#
# public/uploads y writable/session son volumenes: en el primer arranque estan
# vacios y Docker los crea con root, lo que dejaria al panel sin poder escribir
# fotos ni sesiones.
# --------------------------------------------------------------------------
log "preparando directorios de escritura"
mkdir -p \
    "${APP_ROOT}/writable/cache" \
    "${APP_ROOT}/writable/logs" \
    "${APP_ROOT}/writable/session" \
    "${APP_ROOT}/writable/debugbar" \
    "${APP_ROOT}/writable/uploads" \
    "${UPLOADS_DIR}/blog"

# --------------------------------------------------------------------------
# Semilla de uploads.
#
# El repo trae la foto de ejemplo del articulo bajo backend/public/uploads. Al
# montar el volumen sobre ese directorio, el volumen tapa lo que vino en la
# imagen y el articulo se queda sin foto, por eso la copia vive en /seed.
# Solo se vuelca cuando el volumen esta vacio, para no pisar lo que se haya
# subido despues.
# --------------------------------------------------------------------------
if [ -d "$SEED_UPLOADS" ] && [ -n "$(ls -A "$SEED_UPLOADS" 2>/dev/null)" ]; then
    if [ -z "$(ls -A "$UPLOADS_DIR" 2>/dev/null)" ]; then
        log "volumen de uploads vacio: copiando imagenes iniciales"
        cp -R "${SEED_UPLOADS}"/. "${UPLOADS_DIR}"/
    else
        log "volumen de uploads con contenido: se conserva"
    fi
fi

# --------------------------------------------------------------------------
# Espera a MySQL.
#
# depends_on con condition: service_healthy ya cubre el caso normal, pero si
# el volumen de MySQL tarda en montarse o se reinicia la base, este bucle evita
# que las migraciones fallen con un error de conexion poco descriptivo.
# Se comprueba el socket y no la consulta porque mysqladmin no viene en la
# imagen de PHP.
# --------------------------------------------------------------------------
DB_PROBE_HOST="$DB_HOST"
DB_PROBE_PORT="$DB_PORT"
export DB_PROBE_HOST DB_PROBE_PORT

log "esperando a MySQL en ${DB_HOST}:${DB_PORT}"

attempt=1
until php -r '
    $h = getenv("DB_PROBE_HOST");
    $p = (int) getenv("DB_PROBE_PORT");
    $s = @fsockopen($h, $p, $errno, $errstr, 3);
    if ($s === false) { exit(1); }
    fclose($s);
    exit(0);
'; do
    if [ "$attempt" -ge "$DB_ATTEMPTS" ]; then
        err "MySQL no respondio tras $((DB_ATTEMPTS * 2))s en ${DB_HOST}:${DB_PORT}"
        err "comprueba el servicio db y las variables database.default.*"
        exit 1
    fi
    attempt=$((attempt + 1))
    sleep 2
done

log "MySQL responde"

# --------------------------------------------------------------------------
# Migraciones.
#
# Se ejecutan siempre porque son idempotentes: CodeIgniter consulta la tabla de
# migraciones, asi que arrancar un contenedor nuevo sobre la misma base no
# duplica nada, y sobre una base vacia crea el esquema completo.
#
# Esto NO crea usuarios. La base recien migrada no tiene ninguno, y el panel
# rechaza el login si no hay una fila en la tabla users. El primer admin se
# crea a mano:
#
#   docker compose exec web php spark users:create
# --------------------------------------------------------------------------
log "ejecutando migraciones"
cd "$APP_ROOT"
if ! php spark migrate --no-interaction; then
    err "las migraciones fallaron; se detiene el arranque para no servir la web a medias"
    exit 1
fi

# --------------------------------------------------------------------------
# Comprobaciones de arranque.
#
# Esta version de CodeIgniter usa el arranque manual (system/ esta en el
# proyecto y el framework se autocarga desde ahi), asi que el arranque depende
# de system/Boot.php y de los dos paquetes de Composer. No de vendor/autoload.php:
# aunque es lo que genera composer install, la app no lo carga, y abortar
# por su ausencia daria un diagnostico equivocado.
# --------------------------------------------------------------------------
if [ ! -f "${SPA_ROOT}/index.html" ]; then
    err "falta ${SPA_ROOT}/index.html: el build de Vite no llego a la imagen"
    exit 1
fi

if [ ! -f "${APP_ROOT}/system/Boot.php" ]; then
    err "falta system/Boot.php: no se copio el framework de CodeIgniter"
    exit 1
fi

# app/Config/Autoload.php apunta a estos dos directorios a mano, asi que si el
# stage de composer no produjo nada, la web no arranca y el error seria un
# "class not found" en Psr\Log sin pista de por que.
for pkg in psr/log/src laminas/laminas-escaper/src; do
    if [ ! -d "${APP_ROOT}/vendor/${pkg}" ]; then
        err "falta vendor/${pkg}: composer install no produjo las dependencias"
        exit 1
    fi
done

# Los ficheros que haya creado spark como root quedan en manos de root y el
# panel no los podria borrar ni rotar.
log "ajustando propietario final de los directorios escribibles"
chown -R www-data:www-data "${APP_ROOT}/writable" "${UPLOADS_DIR}"
chmod -R 775 "${APP_ROOT}/writable" "${UPLOADS_DIR}"

# nginx escribe el pid y algun fichero temporal en /var/run.
mkdir -p /var/run /run/nginx

log "arrancando supervisord"
exec "$@"
