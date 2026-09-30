# Despliegue de Luna Spa

SPA de React (Vite) + CodeIgniter 4 + MySQL 8 en un unico contenedor web, con
Nginx Proxy Manager delante.

## Como queda montado

```
Internet
   |
   | HTTPS (certificado de Nginx Proxy Manager)
   v
Nginx Proxy Manager            red npm-network
   |
   | HTTP, puerto 80
   v
contenedor "web"               nginx + php-fpm en el mismo contenedor
   |            \
   | /api/*      \ /assets/dashboard/*, /uploads/*
   | /dashboard/*
   v
php-fpm -> CodeIgniter
              |
              | MySQLi
              v
contenedor "db"  (MySQL 8)     red lunaspa, sin puertos publicados
```

Un solo dominio para las tres cosas. Por eso no hay CORS configurado, ni
dominios cruzados, ni problemas de cookies entre subdominios.

### Reparto de rutas

| Ruta | Quien responde |
| --- | --- |
| `/` y las rutas de React Router (`/reviews`, `/blog/:slug`...) | la SPA, `index.html` |
| `/assets/` con nombre con hash | la SPA |
| `/assets/dashboard/` | `backend/public/assets/dashboard/` |
| `/uploads/` | `backend/public/uploads/` (fotos del blog) |
| `/api/*` | `php-fpm` |
| `/dashboard/*` | `php-fpm` |
| `/.well-known/` | la SPA (ficheros de buscadores) |
| `/.ht*` | bloqueado, 403 |

Las dos rutas de `/assets/` estan separadas a proposito: la SPA publica en
`/assets/` y el panel tambien, en `/assets/dashboard/`. `nginx.conf` resuelve
la mas especifica primero.

## Requisitos en el VPS

- Docker Engine con el plugin Compose v2 (`docker compose version`).
- Nginx Proxy Manager funcionando.
- La red externa de NPM creada:

  ```bash
  docker network ls | grep npm-network   # si no aparece:
  docker network create npm-network
  ```

  `docker-compose.yml` la declara `external: true` a proposito. Si el proyecto
  la creara, y NPM ya tuviera una con el mismo nombre pero creada de otra
  forma, habria dos redes homonimas y el contenedor `web` no seria alcanzable
  desde el proxy.

## Primer despliegue

### 1. Configurar

```bash
cp .env.example .env
```

Rellenar como minimo:

| Variable | Que es |
| --- | --- |
| `APP_URL` | dominio publico, con `https://` y **sin** barra final |
| `MYSQL_ROOT_PASSWORD` | contrasena larga, solo se usa dentro del contenedor |
| `MYSQL_PASSWORD` | contrasena del usuario de la aplicacion |

Opcionales: `VITE_API_BASE_URL` (dejarla en `/api`), y el bloque `SMTP_*`.

El `.env` no se versiona. Es la unica fuente de secretos: el contenedor no lee
ningun `.env` de CodeIgniter, todo entra por variables de entorno.

### 2. Levantar

```bash
docker compose up -d --build
```

La primera vez tarda varios minutos: compila la SPA, instala las dependencias
de PHP y descarga la imagen de MySQL.

Las migraciones se ejecutan solas en el arranque del contenedor. Son
idempotentes, asi que tambien se pueden repetir sin miedo.

### 3. Crear el primer usuario

Una base recien migrada **no tiene usuarios**, y el panel rechaza el login si no
hay ninguno. Como el panel esta protegido por sesion, no hay forma de crear el
primer usuario desde la web: se hace por terminal.

```bash
docker compose exec -it web php spark users:create
```

Pregunta usuario, correo, nombre, rol y contrasena. El `-it` es necesario para
que funcione la entrada por terminal.

Sin terminal interactiva, con todos los valores:

```bash
docker compose exec web php spark users:create \
  --username=admin \
  --email=admin@ejemplo.com \
  --name="Administrador" \
  --role=admin \
  --password='una-contrasena-larga' \
  --password-confirm='una-contrasena-larga'
```

`--password` y `--password-confirm` van siempre juntos; si solo se pasa una, el
comando avisa. Los roles son `admin` (todo el panel) y `editor` (sin gestion de
usuarios).

### 4. Nginx Proxy Manager

Proxy Host nuevo:

- Domain Names: el dominio de `APP_URL`
- Scheme: `http`
- Forward Hostname / IP: `web`
- Forward Port: `80`
- Block Common Exploits: activado
- Websockets Support: sin necesidad
- SSL: Let's Encrypt, con "Force SSL" y "HTTP/2" activados

**Forward Hostname debe ser `web`**, el nombre del servicio, y no
`localhost` ni `127.0.0.1`: esos apuntan al propio contenedor de NPM.

NPM manda las cabeceras `X-Forwarded-Proto` y `X-Forwarded-For`, que es lo que
permite que CodeIgniter sepa que la peticion original era HTTPS
(`app.proxyIPs = "*"`). Con eso Panel > Ajustes > Red > SSL > HTTP/2
aplicado.

## Comprobar que todo funciona

```bash
# Estado y salud de los contenedores
docker compose ps
docker compose logs -f web

# La API responde (debe devolver JSON con la lista de reseñas)
curl -s http://localhost/api/reviews        # dentro del VPS
curl -s https://TU-DOMINIO/api/reviews     # desde fuera

# El panel carga
curl -sI https://TU-DOMINIO/dashboard/login | head -1     # 200

# El CSS del panel lo sirve el backend, no la SPA
curl -sI https://TU-DOMINIO/assets/dashboard/dashboard.css | head -1   # 200

# Una ruta de React Router devuelve la SPA, no un 404
curl -sI https://TU-DOMINIO/reviews | head -1              # 200
```

Y en el navegador, entrar en `https://TU-DOMINIO/dashboard/login` con el usuario
creado, publicar un articulo y enviar una reseña desde la web.

## Actualizar el codigo

```bash
git pull
docker compose up -d --build
```

El `--build` es obligatorio siempre que cambie el frontend o el backend: tanto
el bundle de Vite como las extensiones de PHP se hornean en la imagen. Un simple
`docker compose restart` serviria la version antigua.

Si solo cambian ficheros de contenido y no hay build, basta con reiniciar.

## Copias de seguridad

Lo que no se puede perder esta en dos volumenes (`uploads`, `db_data`):

```bash
# Base de datos
docker compose exec -T db mysqldump -ulunaspa -p'CONTRASENA' \
  lunaspa > luna-$(date +%F).sql

# Fotos subidas
docker run --rm -v lunaspa_uploads:/d -v "$PWD":/backup alpine \
  tar czf /backup/uploads-$(date +%F).tar.gz -C /d .
```

El nombre del volumen lleva el prefijo del proyecto (`lunaspa_`); con
`docker volume ls` se comprueba. En un `down -v` se borran los dos.

## Detalles que conviene conocer

### `clear_env = no` en php-fpm

La configuracion de CodeIgniter llega por variables de entorno, y php-fpm por
defecto las borra del entorno de los workers. Sin `clear_env = no` en
`docker/php-fpm-www.conf`, `getenv()` devolveria `false` y la aplicacion
intentaria conectarse a MySQL en `127.0.0.1` sin usuario. Ese fichero es
obligatorio, no una preferencia.

### Los prefijos de las variables

En `docker-compose.yml` las variables se llaman `app.baseURL`,
`session.driver` o `database.default.hostname`. El prefijo es el nombre corto de
la clase de configuracion (`App`, `Session`, `Database\...`). Un nombre mal
puesto **no da error**: la variable se ignora en silencio y el sitio arranca con
los valores por defecto de `app/Config`. Por eso conviene no tocar esos nombres
sin comprobarlos.

### `VITE_API_BASE_URL` se hornea en el bundle

Vite la escribe dentro del JavaScript en tiempo de compilacion, no es una
variable de ejecucion. Cambiarla exige `docker compose up -d --build`.

Con el valor por defecto `/api` la SPA usa rutas relativas, que es lo correcto
al compartir dominio con la API. Si algun dia se separan en dominios distintos,
habria que poner la URL absoluta y configurar CORS en el backend, que ahora
mismo no lo tiene.

### `base` de Vite segun el modo

`react/vite.config.js` usa `base: "./"` en desarrollo (la SPA se sirve desde un
subdirectorio en local) y `base: "/"` en produccion (raiz del dominio). Con
`"./"` en produccion, abrir directamente `/blog/mi-articulo` haria que el
navegador pidiera `/blog/assets/app.js` y la pagina se quedaria en blanco.

### Sin `composer.lock`

El repositorio no tiene lock, asi que `composer install` resuelve las versiones
en cada build. Con este `composer.json` eso son solo `psr/log` y
`laminas/laminas-escaper`; el framework va aparte, en `system/`, y se autocarga
sin pasar por el autoloader de Composer. Aun asi, en cuanto se pueda generar y
commitear el lock, el build deja de depender de lo que resuelva Composer ese dia:

```bash
docker run --rm -v "$PWD":/app -w /app composer:2 \
  composer update --no-dev --no-scripts
```

Con `--no-scripts` porque el `post-autoload-dump` de este `composer.json` ejecuta
`composer update --working-dir=utils` y no hay carpeta `utils/`.

### Migraciones y fotos iniciales

`public/uploads` es volumen, y un volumen vacio tapa lo que vino en la imagen.
El Dockerfile copia las fotos del repo a `/seed/uploads` y el entrypoint las
vuelca en el volumen **solo si esta vacio**, para no pisar lo subido despues.

### Extensiones de PHP

`gd` con WebP e `intl` no son opcionales: sin `gd` el panel no sube las fotos
del blog (se convierten a WebP) y sin `intl` CodeIgniter ni arranca. El build
falla con `docker-php-ext-check` si falta alguna, en vez de descubrirlo en
produccion.

## Problemas frecuentes

**El panel da error 500 al entrar**
Revisar `docker compose logs web`. Lo mas probable es `MYSQL_PASSWORD`
desincronizada: si se cambio en el `.env` despues del primer arranque, hay que
cambiarla tambien dentro de MySQL (ver el comentario en `.env.example`).

**El sitio carga pero en blanco**
Suele ser la cache del navegador o de NPM con una version anterior del bundle.
Comprobar con una ventana de incógnito. Si persiste, `docker compose build
--no-cache web`.

**"502 Bad Gateway" desde NPM**
El contenedor `web` no esta en la red `npm-network`, o el nombre no es `web`:

```bash
docker inspect lunaspa-web-1 --format '{{json .NetworkSettings.Networks}}'
```

**El login del panel no guarda la sesion**
La cookie de sesion es `Secure`, asi que solo viaja por HTTPS. Si se esta
probando por HTTP plano, se puede relajar sin reconstruir la imagen:

```bash
PHP_INI_OVERRIDES="session.cookie_secure = 0" docker compose up -d
```

**Cambiar la contrasena de MySQL sin perder datos**

```bash
docker compose exec db mysql -ulunaspa -p'CONTRASENA_VIEJA' \
  -e "ALTER USER 'lunaspa'@'%' IDENTIFIED BY 'CONTRASENA_NUEVA';"
```

Actualizar despues `MYSQL_PASSWORD` en el `.env` y `docker compose up -d`.

## Lo que este despliegue no incluye

- **Rate limit en el envio de reseñas.** El unico antispam es un campo
  `website` trampa (honeypot). Funciona contra bots ingenuos; contra uno
  escrito para el sitio, no. Lo logico seria limitar por IP en el controlador,
  pero se dejo fuera a proposito para no anadir comportamiento sin probar.
- **Las reseñas de ejemplo.** Las cuatro reseñas locales de desarrollo (ids
  14-17) no viajan a produccion: viven en la base de datos local y no hay
  ningun script que las exporte. Si se quieren, hay que exportarlas a mano.
- **Envio de correo.** La aplicacion **no envia ningun correo**: no hay una
  sola llamada a `->send()` en todo el backend. Lo unico que hace con el correo
  es guardarlo, en las reseñas y en los usuarios del panel. El bloque `SMTP_*`
  del `.env` esta preparado por si se anade envio en el futuro, pero rellenarlo
  ahora no cambia nada.
