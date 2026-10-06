#!/bin/sh
# Importa en la base de PRODUCCION el contenido del blog y las reseñas que
# estaban en la base local de desarrollo.
#
#   docker/import-contenido.sh lunaspa-contenido.sql
#
# Se ejecuta en el VPS, en la raiz del repositorio, y habla con MySQL a traves
# del contenedor "db" de este mismo docker compose. No necesita credenciales a
# mano: toma las del .env de siempre.
#
# El volcado .sql lo genera mysqldump sobre la base local. No lleva CREATE
# TABLE: el esquema en produccion ya lo crean las migraciones del entrypoint.
#
# Lo que NO se importa, a proposito:
#
#   - La tabla users. Las cuentas de produccion son distintas de las locales, y
#     copiarlas traeria contrasenas y correos de desarrollo. Los usuarios se
#     crean con "php spark users:create".
#   - Los posts de prueba. El volcado se genera filtrando por id.
#
# Lo que el script si reescribe son las columnas que apuntan a users
# (created_by, updated_by, moderated_by). Esos ID son los de la base local y no
# significan nada en produccion: se resuelven por nombre de usuario contra la
# tabla users de aqui. Si el usuario no existe, se ponen a NULL en vez de dejar
# un ID colgante, porque un JOIN a users sobre un id inexistente da NULL en
# cualquier vista del panel.
#
# Es idempotente: se puede repetir sin duplicar. Borra por slug antes de insertar
# y, con las claves foraneas en ON DELETE CASCADE de blog_blocks y
# blog_internal_links, los bloques y enlaces del post se van con el.
set -eu

DUMP_FILE="${1:-}"

log() { printf '[import] %s\n' "$*"; }
err() { printf '[import] ERROR: %s\n' "$*" >&2; }

if [ -z "$DUMP_FILE" ]; then
    err "uso: $0 <fichero.sql>"
    err "ejemplo: $0 lunaspa-contenido.sql"
    exit 1
fi

if [ ! -f "$DUMP_FILE" ]; then
    err "no existe el fichero: $DUMP_FILE"
    exit 1
fi

if [ ! -f docker-compose.yml ]; then
    err "ejecuta esto desde la raiz del repositorio, donde esta docker-compose.yml"
    exit 1
fi

# Mismo criterio que el entrypoint: los nombres con puntos en las variables de
# entorno no se pueden expandir en ash.
env_or() {
    env_or_value=$(printenv "$1" 2>/dev/null || printf '%s' '')
    printf '%s' "${env_or_value:-$2}"
}

DB_NAME=$(env_or MYSQL_DATABASE lunaspa)
DB_USER=$(env_or MYSQL_USER lunaspa)
DB_PASS=$(env_or MYSQL_PASSWORD '')
DB_HOST=$(env_or database.default.hostname db)
DB_PORT=$(env_or database.default.port 3306)

# Usuario al que se atribuyen los posts y las reseñas. Debe existir ya en
# produccion, asi que se comprueba antes de tocar nada.
AUTHOR_USER="${AUTHOR_USER:-editor}"

if [ -z "$DB_PASS" ]; then
    err "no hay MYSQL_PASSWORD en el .env; el contenedor db no se podria abrir"
    exit 1
fi

if ! docker compose ps --status running --services 2>/dev/null | grep -qx db; then
    err "el servicio db no esta corriendo; arranca antes con: docker compose up -d"
    exit 1
fi

# mysql dentro del contenedor. La contraseña va solo por MYSQL_PWD: pasar --password
# en la linea de comandos la deja en el historial del proceso y es visible para
# cualquiera que ejecute "ps aux" en el servidor. MYSQL_PWD la lee el propio
# cliente mysql, asi que no hace falta --password.
db() {
    docker compose exec -T -e MYSQL_PWD="$DB_PASS" db mysql \
        --user="$DB_USER" \
        --default-character-set=utf8mb4 \
        --database="$DB_NAME" \
        -N -B -e "$1"
}

# Igual que db(), pero para mysqldump (lo usa la copia de seguridad).
dump_tables() {
    docker compose exec -T -e MYSQL_PWD="$DB_PASS" db mysqldump \
        --user="$DB_USER" \
        --default-character-set=utf8mb4 \
        --single-transaction \
        --no-tablespaces \
        --skip-lock-tables \
        "$DB_NAME" "$@"
}

log "base de destino: $DB_NAME en el host $DB_HOST:$DB_PORT"

# ---------------------------------------------------------------- estado previo
log "contenido actual en produccion"
for table in blog_posts blog_blocks blog_internal_links review_comments; do
    count=$(db "SELECT COUNT(*) FROM $table;" 2>/dev/null || printf '?')
    log "  $table: $count filas"
done

# ------------------------------------------------------------- usuario autor
author_id=$(db "SELECT id FROM users WHERE username = '$AUTHOR_USER' LIMIT 1;" 2>/dev/null || printf '')
author_id=$(printf '%s' "$author_id" | tr -d '\r' | head -n 1)

if [ -z "$author_id" ]; then
    err "no existe el usuario '$AUTHOR_USER' en produccion."
    err "crealo antes con:"
    err "  docker compose exec web php /var/www/backend/spark users:create \\"
    err "    --username=$AUTHOR_USER --email=correo@dominio.com \\"
    err "    --name=\"$AUTHOR_USER\" --role=editor"
    err "o indica otro con: AUTHOR_USER=otro $0 $DUMP_FILE"
    exit 1
fi

log "los posts y reseñas se atribuiran a '$AUTHOR_USER' (id $author_id)"

# ------------------------------------------------------------------- seguridad
# Nada de esto toca la tabla users, pero un DROP TABLE por un typo en el nombre
# seriaCatastrófico. Se comprueba el esquema antes de escribir.
for table in blog_posts blog_blocks blog_internal_links review_comments users; do
    exists=$(db "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$DB_NAME' AND table_name = '$table';" 2>/dev/null || printf '0')
    if [ "$exists" != "1" ]; then
        err "falta la tabla $table en $DB_NAME"
        err "comprueba que las migraciones se ejecutaron: docker compose logs web"
        exit 1
    fi
done

# --------------------------------------------------------------- copia de seguridad
BACKUP_FILE="respaldo-antes-de-importar-$(date -u +%Y%m%d-%H%M%S).sql"

log "copia de seguridad en $BACKUP_FILE"

# Los errores van a un fichero aparte, no a /dev/null: si mysqldump falla por la
# contrasena o por una tabla que no existe, sin esto el script no dire por que
# y el unico sintoma sera que no hay copia de seguridad.
dump_err=$(mktemp)

if ! dump_tables blog_posts blog_blocks blog_internal_links review_comments > "$BACKUP_FILE" 2> "$dump_err"; then
    err "no se pudo hacer la copia de seguridad; no se sigue"
    if [ -s "$dump_err" ]; then
        err "mysqldump dijo:"
        cat "$dump_err" >&2
    fi
    rm -f "$dump_err"
    exit 1
fi

rm -f "$dump_err"

if [ ! -s "$BACKUP_FILE" ]; then
    err "la copia de seguridad salio vacia; no se sigue"
    exit 1
fi

log "copia hecha ($(wc -c < "$BACKUP_FILE" | tr -d ' ') bytes)"

if [ ! -f "$DUMP_FILE" ] || [ ! -s "$DUMP_FILE" ]; then
    err "el volcado esta vacio; no se sigue"
    exit 1
fi

# mysqldump genera "INSERT INTO" planos, que fallan con ERROR 1062 Duplicate
# entry en cuanto existe un post con el mismo slug. Se convierten a REPLACE, que
# borra la fila que choca e inserta la del volcado.
#
# Comprobado contra el esquema real: slug es clave unica, asi que un post de
# produccion con el mismo slug pero otro id se resuelve solo. REPLACE es tambien
# lo que hace el script idempotente: al repetirlo los conteos no cambian.
sed 's/^INSERT INTO /REPLACE INTO /' "$DUMP_FILE" > "$DUMP_FILE.tmp"

if ! mv "$DUMP_FILE.tmp" "$DUMP_FILE"; then
    err "no se pudo preparar el volcado"
    exit 1
fi

log "volcado preparado ($(grep -c '^REPLACE INTO' "$DUMP_FILE" || printf 0) sentencias)"

# El volcado se envuelve en una transicion y se manda por stdin, no por -e:
# pasar el fichero entero como argumento lo pondria en la linea de comandos, que
# tiene un limite de longitud y trunca los volcados grandes con un error
# críptico.
#
# Si una sentencia falla, el cliente mysql para en el error y nunca llega al
# COMMIT. Al cerrarse la conexion, MySQL revierte sola la transicion abierta, asi
# que el "rollback" no hay que hacerlo a mano.
log "importando $DUMP_FILE"

import_err=$(mktemp)

if { printf 'START TRANSACTION;\n'; cat "$DUMP_FILE"; printf '\nCOMMIT;\n'; } \
    | docker compose exec -T -e MYSQL_PWD="$DB_PASS" db mysql \
        --user="$DB_USER" \
        --default-character-set=utf8mb4 \
        --database="$DB_NAME" \
        2> "$import_err"; then
    :
else
    err "la importacion fallo y se ha revertido; la base queda como estaba"
    if [ -s "$import_err" ]; then
        err "mysql dijo:"
        cat "$import_err" >&2
    fi
    rm -f "$import_err"
    err "la copia previa sigue en $BACKUP_FILE"
    exit 1
fi

if [ -s "$import_err" ]; then
    log "avisos de mysql durante la importacion:"
    cat "$import_err"
fi

rm -f "$import_err"

# ----------------------------------------------------------------- verificacion
# Si la importacion termina pero no hay posts, algo no salio como se esperaba. No
# se borra nada para "arreglarlo": un DELETE por aqui se llevaria por delante el
# contenido que ya hubiera en produccion. Se informa y se deja el backup a mano.
imported=$(db "SELECT COUNT(*) FROM blog_posts;" 2>/dev/null || printf '0')

if [ "$imported" -lt 1 ]; then
    err "la importacion termino sin error pero blog_posts sigue vacia"
    err "revisa $DUMP_FILE a mano antes de seguir"
    err "el contenido anterior, si lo habia, esta en $BACKUP_FILE"
    exit 1
fi

log "contenido importado"

# No hay limpieza de huerfanos que hacer, y es a proposito. REPLACE borra la fila
# vieja del post y mete la nueva en el mismo id, de modo que blog_blocks y
# blog_internal_links nunca quedan apuntando a un id que ya no exista: los bloques
# del post reemplazado se reescriben con el contenido del volcado. Se verifica
# al final que no haya huerfanos, pero no se borra nada.

# ------------------------------------------------------- referencias a usuarios
# Aqui es donde se arreglan los ID de la base local. Se hace por nombre, no
# copiando el valor del volcado, para que no dependa de que los IDs coincidan.
log "atribuyendo posts y reseñas a '$AUTHOR_USER'"
db "
UPDATE blog_posts SET created_by = $author_id, updated_by = $author_id;
UPDATE review_comments SET moderated_by = $author_id WHERE status IN ('published', 'rejected');
" >/dev/null

# Las que estaban pendientes no se moderan aqui: dejarlas sin moderador es lo
# correcto, el equipo las decide desde el panel.
pending=$(db "SELECT COUNT(*) FROM review_comments WHERE status = 'pending';" 2>/dev/null || printf '0')
log "  $pending reseñas siguen en pending, sin atribuir"

# No se toca AUTO_INCREMENT a proposito. MySQL nunca lo baja, solo lo sube, asi
# que MySQL recalcula el siguiente id por su cuenta tras el REPLACE. Ponerlo a 1
# a mano no protege de un id en uso: ademas, si MySQL tiene que reasignar ids, lo
# hace con el menor libre, que es justo lo que se quiere.

# ------------------------------------------------------------------ verificacion
log "contenido final en produccion"
for table in blog_posts blog_blocks blog_internal_links review_comments; do
    count=$(db "SELECT COUNT(*) FROM $table;" 2>/dev/null || printf '?')
    log "  $table: $count filas"
done

orphans=$(db "
SELECT
    (SELECT COUNT(*) FROM blog_blocks b LEFT JOIN blog_posts p ON p.id = b.post_id WHERE p.id IS NULL)
  + (SELECT COUNT(*) FROM blog_internal_links l LEFT JOIN blog_posts p ON p.id = l.post_id WHERE p.id IS NULL);
" 2>/dev/null || printf '?')

if [ "$orphans" != "0" ]; then
    err "quedan $orphans filas huerfanas sin post; el panel no las mostrara"
else
    log "sin filas huerfanas"
fi

log "hecho. Revisa https://lunaspa.sayulitatravel.com/dashboard"
log ""
log "para revertir:"
log "  MYSQL_PWD='<la de tu .env>' docker compose exec -T -e MYSQL_PWD='<la de tu .env>' \\"
log "    db mysql --user=$DB_USER --database=$DB_NAME < $BACKUP_FILE"
