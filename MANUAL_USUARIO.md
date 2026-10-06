# Manual de usuario — Panel de contenido de Luna Spa

**Aplicación:** Luna Spa — Content Dashboard
**Componente:** Backend CodeIgniter 4 (`backend/`) + sitio público React (`react/`)
**Versión del documento:** 1.0
**Fecha de emisión:** 02/10/2026
**Dirigido a:** Editor de contenido (redactor), administrador del panel y administrador técnico del sitio

---

## Nota de convención

Los textos que aparecen dentro de las cajas de texto de este manual son **exactamente las etiquetas y mensajes tal como aparecen en pantalla**, para que puedas localizarlos sin dudas.

> **Nota importante:** la interfaz del panel está escrita **deliberadamente sin acentos ni eñes** (por ejemplo, se ve `Articulos` y no `Artículos`). Este manual usa ortografía correcta en el texto explicativo, pero respeta esa convención al citar literalmente lo que ves en pantalla. Si buscas `Articulos` en el panel y no lo encuentras, es exactamente el mismo enlace: solo está escrito sin tilde.

---

## 1. Introducción

### 1.1 ¿Qué es este panel?

Es el panel de administración del contenido de **Luna Spa**. Desde aquí se administra todo el contenido editorial del sitio:

- Los **artículos del blog** que se publican en `/blog`.
- Los **comentarios y reseñas** que los clientes dejan desde el formulario `/reviews-score`.
- Los **usuarios** del propio panel (solo administradores).

El sitio público (hecho en React) no guarda nada: **lee el contenido desde este backend mediante una API**. Por eso, todo lo que haces aquí tarda unos segundos en reflejarse en la web.

### 1.2 ¿Qué NO hace este panel?

- No envía correos electrónicos de ningún tipo (ni recuperación de contraseña, ni avisos de comentarios nuevos).
- No guarda versiones ni historial de los artículos. **Guardar sobrescribe el contenido anterior** (ver la sección 6.4).
- No permite editar el contenido estático de la página de inicio, precios, servicios ni datos de contacto. Eso se cambia en el código del frontend.

### 1.3 Convenciones de la interfaz

| Elemento | Significado |
|---|---|
| Botón azul `+ Nuevo articulo` / `+ Nuevo usuario` | Crea un registro nuevo |
| Botón gris `Editar` | Abre el formulario de edición |
| Botón rojo `Borrar` / `Eliminar comentario` | Acción destructiva e irreversible; pide confirmación |
| Botón fantasma `Ver API` / `Ver como JSON` | Abre el dato en crudo en otra pestaña (verificado técnico) |
| `ls-alert` verde | Operación exitosa |
| `ls-alert` rojo | Error o validación fallida |
| Etiqueta de color con texto `published` / `draft` | Estado del artículo |
| Etiqueta de color con texto `Pendiente` / `Publicada` / `Rechazada` | Estado del comentario |
| Etiqueta `destacado` | El artículo se muestra como tarjeta grande en el listado del blog |

---

## 2. Requisitos y acceso al panel

### 2.1 Requisitos

- Navegador web moderno (Chrome, Edge, Firefox, Safari).
- Conexión a internet (o a la red local donde esté publicado el sitio).
- **Una cuenta de usuario y una contraseña** provistas por el administrador del panel.
- El acceso se hace siempre por **HTTPS** en el sitio publicado.

### 2.2 Cómo entrar

1. Abre el navegador.
2. Escribe la dirección del panel seguida de `/dashboard`. Ejemplo: `https://lunaspa.mx/dashboard`
   - En el entorno local de desarrollo: `http://localhost/lunaspa/backend/public/dashboard`
3. Se mostrará la pantalla de **inicio de sesión**.
4. Escribe tus credenciales y presiona **Entrar**.

> **Consejo:** marca la página con un favorito (marcador) para no tener que escribir la URL cada vez.

### 2.3 Si tu navegador dice "La conexión no es privada"

El sitio usa un certificado de seguridad (HTTPS). Si aparece una advertencia, **no la aceptes**: avisa al administrador técnico. Nunca ingreses credenciales en una página con aviso de seguridad.

---

## 3. Roles y permisos

El panel tiene **dos roles**. El rol se asigna al crear o editar una cuenta y define qué módulos se ven en el menú superior.

### 3.1 Tabla de permisos

| Función | `admin` (Administrador) | `editor` (Editor) |
|---|:---:|:---:|
| Ver, crear, editar y borrar artículos del blog | Sí | Sí |
| Ver la vista previa de un artículo | Sí | Sí |
| Ver, moderar y borrar comentarios | Sí | Sí |
| Ver el menú **Usuarios** | Sí | **No** |
| Crear, editar, desactivar y borrar usuarios | Sí | **No** |
| Ver el enlace **API JSON** y los botones **Ver API** / **Ver como JSON** | Sí | **No** |
| Consultar los datos crudos en JSON | Sí | **No** |

### 3.2 Qué es exactamente la diferencia entre `admin` y `editor`

- El rol **`editor`** puede hacer **todo el trabajo editorial**: artículos y comentarios. No puede tocar la lista de usuarios.
- El rol **`admin`** puede, además, **dar de alta y dar de baja cuentas**, cambiar contraseñas y roles, y consultar la API.

### 3.3 Importante: el rol se aplica en el servidor, no solo en el menú

Si un `editor` escribe la dirección `/dashboard/users` a mano en el navegador, verá un mensaje técnico de error `403` con el texto `Se requiere rol de administrador.` — **no es un fallo del sistema**, es la protección funcionando correctamente.

---

## 4. Iniciar sesión

### 4.1 La pantalla de acceso

Al entrar a `/dashboard` sin sesión iniciada verás una pantalla con el título **Luna Spa / Panel de contenido del blog** y dos campos.

### 4.2 Campos del formulario

| Campo en pantalla | Qué escribir | Notas |
|---|---|---|
| `Usuario o correo` | Tu **nombre de usuario** *o* tu **correo electrónico** | Cualquiera de los dos funciona. Los espacios al principio o al final se ignoran automáticamente. |
| `Contrasena` | Tu contraseña | Campo oculto con puntos. El ícono del ojo permite mostrarla u ocultarla. |

### 4.3 Procedimiento

1. Escribe tu **usuario o correo** en el campo correspondiente.
2. Escribe tu **contraseña**.
3. *(Opcional)* Presiona el ícono del ojo para verificar que la contraseña es correcta.
4. Presiona el botón **Entrar**.
5. Si las credenciales son correctas, entrarás al listado de artículos y verás el mensaje verde `Hola, {tu nombre}.`

### 4.4 Mensajes de error y cómo resolverlos

| Mensaje en pantalla | Causa | Qué hacer |
|---|---|---|
| `Escribe tu usuario y tu contrasena.` | Dejaste algún campo vacío | Completa ambos campos |
| `Usuario o contrasena incorrectos.` | La combinación no existe o la cuenta está desactivada | Verifica las mayúsculas y que no haya espacios. Si sigue igual, avisa al administrador (puede que tu cuenta esté dada de baja) |
| `Demasiados intentos fallidos. Intenta de nuevo en N minuto(s).` | Se acumularon 5 intentos fallidos con ese identificador | **Espera los minutos indicados** y vuelve a intentarlo. Ver 4.5 |
| `Inicia sesion para continuar.` | Intentaste abrir una página del panel sin tener sesión | Vuelve a iniciar sesión |

### 4.5 Bloqueo por intentos fallidos (protección contra ataques)

Como medida de seguridad, después de **5 intentos fallidos seguidos** con el mismo identificador, esa cuenta queda **bloqueada durante 15 minutos**.

Reglas a tener en cuenta:

- El bloqueo es **por identificador** (usuario o correo), no por el número total de intentos de la cuenta.
- El bloqueo **se reinicia** en cuanto un intento tiene éxito.
- **Solo aplica al identificador que falló.** Si fallaste con `editor1`, puedes entrar normalmente con `editor2`.
- **Advertencia para administradores:** el contador de intentos se guarda en la sesión del navegador, no en el servidor. Si borras las cookies del navegador, el bloqueo se reinicia. Cada persona debe usar su propia cuenta: compartir un mismo usuario entre varias personas vuelve imposible saber quién fue el que falló y destruye la trazabilidad de los accesos.

### 4.6 Sesión y cierre automático

- La sesión tiene una vigencia de **2 horas**. Si pasan 2 horas sin hacer nada en el panel, el sistema te saca y vuelve a la pantalla de acceso. Tus datos ya guardados no se pierden: simplemente hay que volver a entrar.
- Cualquier navegación o acción cuenta como actividad.
- Si un administrador **desactiva tu cuenta**, tu sesión se cierra automáticamente en cuanto intentes continuar trabajando.

### 4.7 Recuperar la contraseña

El panel **no envía correos**, por lo que **no existe "Olvidé mi contraseña"**. Para recuperarla:

1. **Si eres `admin`:** entra a `Usuarios` → busca la cuenta → `Editar` → escribe la nueva contraseña en el campo `Nueva contrasena (opcional)` → `Guardar usuario`.
2. **Si eres `editor`:** pídele a un `admin` que la restablezca.
3. **Si no hay ningún `admin` disponible:** el administrador técnico del sitio puede crearte una cuenta desde la terminal (ver el **Anexo C**).

---

## 5. La pantalla del panel (elementos comunes)

Todas las pantallas del panel comparten la misma estructura.

### 5.1 Barra superior

| Elemento | Función |
|---|---|
| **Luna Spa / Content Dashboard** | Logotipo. Al presarlo regresas al inicio del panel (listado de artículos). |
| **Articulos** | Módulo de artículos del blog. |
| **Comentarios** | Módulo de comentarios y reseñas. |
| **Usuarios** | Módulo de usuarios. **Solo visible para `admin`.** |
| **API JSON** | Abre los datos de artículos en JSON en otra pestaña. **Solo `admin`.** |
| **Círculo con iniciales** | Tus iniciales (derivadas de tu nombre completo o tu usuario). Al pasar el cursor muestra tu nombre de usuario. |
| **Salir** | Cierra la sesión y regresa a la pantalla de acceso. |

El enlace de la sección en la que te encuentras aparece resaltado.

### 5.2 Tarjetas de resumen

Algunas pantallas comienzan con tarjetas de números (por ejemplo, `Articulos` / `Publicados` / `Borradores`). Son **solo informativas**: no son botones.

### 5.3 Mensajes de resultado

- **Verde:** la operación se completó (por ejemplo, `Articulo creado.`).
- **Rojo:** hubo un error (por ejemplo, `El titulo es obligatorio.`).

Los mensajes aparecen en la parte superior del contenido y **se borran al recargar la página** o al navegar a otra sección.

### 5.4 Botones **Volver**, **Cancelar** y **← Volver**

Te devuelven al listado sin guardar nada. **Si tenías cambios escritos y presionas uno de estos botones, se pierden sin aviso.** Guarda antes de salir.

---

## 6. Módulo Artículos del blog

### 6.1 Pantalla principal: el listado

Esta es la pantalla de inicio del panel (`/dashboard`).

#### Tarjetas de resumen

| Tarjeta | Significado |
|---|---|
| `Articulos` | Total de artículos, sin importar su estado |
| `Publicados` | Artículos visibles en el blog |
| `Borradores` | Artículos guardados pero **no** visibles en el blog |

#### Botones de la cabecera

| Botón | Para quién | Qué hace |
|---|---|---|
| `Ver API` | Solo `admin` | Abre `/api/posts` en una pestaña nueva con los artículos publicados en JSON |
| `+ Nuevo articulo` | Todos | Abre el formulario de artículo vacío |

#### La tabla de artículos

| Columna | Contenido |
|---|---|
| **Titulo** | El título del artículo. Debajo, en letra pequeña, el `Antetitulo (eyebrow)` si lo tiene |
| **Slug** | La parte final de la dirección pública: `/blog/mi-articulo`. **Esta es la URL real del artículo en el sitio** |
| **Categoria** | `wellness`, `sayulita` o `massage`. Determina el filtro del blog |
| **Estado** | `draft` o `published`. Si además aparece la etiqueta `destacado`, se muestra como tarjeta grande en el listado |
| **Orden** | Número de posición. **Menor número = aparece primero** en el listado del blog |
| **Actualizado** | Fecha y hora de la última modificación |

#### Acciones por fila

| Botón | Efecto |
|---|---|
| `Editar` | Abre el formulario con el artículo cargado |
| `Vista previa` | Abre en una pestaña nueva cómo se verá el artículo en el blog |
| `Borrar` | Pide confirmación (`Eliminar este articulo y todos sus bloques?`) y **elimina el artículo y todo su contenido de forma permanente**. No se puede deshacer |

> **Importante:** el listado se ordena primero por `Orden` ascendente y después por fecha de creación (del ID más alto al más bajo). Para reordenar el blog, edita el número de `Orden` de cada artículo.

#### Estado vacío

Si no hay artículos, verás: `Todavia no hay articulos. Crea el primero o ejecuta el seeder para volcar el contenido actual.`

---

### 6.2 Crear un artículo nuevo

**Cómo llegar:** `Articulos` → botón `+ Nuevo articulo`.

El formulario está dividido en **cinco tarjetas** (secciones). Los campos marcados como obligatorios son solo algunos; el resto puede quedar vacío.

#### ⚠️ Advertencia antes de empezar

> En un artículo **nuevo**, el campo `Estado` aparece marcado como **`published`** por defecto. Si presionas `Guardar articulo` sin cambiarlo, **el artículo se publica inmediatamente en el sitio web**. Si todavía no está listo, cambia el Estado a `draft` antes de guardar.

---

#### Sección 1 — `Contenido principal`

| Campo en pantalla | Obligatorio | Qué es | Recomendación |
|---|:---:|---|---|
| `Titulo (H1)` | **Sí** | El encabezado principal del artículo | Es lo primero que ve el lector. Máximo recomendado: 60–70 caracteres |
| `Slug (URL)` | No | La dirección web del artículo | **Déjalo vacío** y el sistema lo genera solo a partir del título. Si lo escribes, debe ser único: si ya existe, el sistema le añade un número (`-2`, `-3`). Ejemplo: `consejos-de-relajacion` |
| `Antetitulo (eyebrow)` | No | Texto pequeño sobre el título | Ej.: `Wellness · Travel` |
| `Entradilla` | No | Párrafo introductorio debajo del título | Si lo dejas vacío y no llenas la descripción SEO, el artículo se publica sin texto de entrada. Máximo ~200 caracteres |
| `Imagen de la portada` | No | Fotografía principal del artículo | Ver **6.3 Imágenes** |
| `Texto de la imagen decorativa` | No | Texto que se muestra **sobre** la portada | Si no subes imagen, este texto es lo único que aparece en la portada. Ej.: `Wellness in Sayulita` |

**Sobre el Slug:** si lo dejas vacío, el sistema lo arma a partir del título: pasa todo a minúsculas y reemplaza **cada secuencia de caracteres no alfanuméricos** por un guion.

| Título | Slug generado |
|---|---|
| `¿Cómo relajarse en Sayulita?` | `c-mo-relajarse-en-sayulita` |
| `5 Mistakes to Avoid` | `5-mistakes-to-avoid` |
| `Mejor Massage en Sayulita` | `mejor-massage-en-sayulita` |

> **Atención:** las letras acentuadas **se eliminan, no se convierten**. Por eso `ó` desaparece en lugar de convertirse en `o`, y la palabra queda partida: `cómo` → `c-mo`.
>
> **Recomendación:** si te importa que la URL se lea bien, **escribe el slug a mano**, en minúsculas, sin acentos ni ñ y separado por guiones (por ejemplo `como-relajarse-en-sayulita`). Si el slug que escribes ya existe en otro artículo, el sistema le añade un sufijo automáticamente (`-2`, `-3`…) para que no se repitan.

---

#### Sección 2 — `Cuerpo del articulo`

Aquí se escribe el contenido largo del artículo mediante **bloques**.

##### Cómo funcionan los bloques

- Los bloques se guardan **en el orden en que aparecen** en la pantalla.
- Cada bloque tiene un número (`Bloque 1`, `Bloque 2`…) que se renumera solo al quitar uno.
- Un artículo nuevo empieza con un bloque de tipo `P` ya creado.

##### Tipos de bloque disponibles

| Tipo | Para qué sirve | Campo que debes llenar |
|---|---|---|
| `P` | Párrafo normal | `Texto del bloque` |
| `H2` | Subtítulo de sección | `Texto del bloque` |
| `H3` | Subtítulo menor | `Texto del bloque` |
| `UL` | Lista con viñetas | `Un elemento por linea` |
| `OL` | Lista numerada | `Un elemento por linea` |
| `QUOTE` | Cita o frase destacada | `Texto del bloque` |

> **Importante:** cuando seleccionas `UL` u `OL`, el campo de texto se oculta y aparece el de elementos. **Escribe un elemento por línea**: cada línea se convierte en un elemento de la lista. Las líneas en blanco se ignoran.

##### Botones de la sección

| Botón | Qué hace |
|---|---|
| `+ Anadir bloque` | Agrega un bloque nuevo al final |
| `Quitar` | Elimina ese bloque. **No se puede quitar el último bloque que quede en el artículo** |

> **Consejo de redacción:** un buen artículo de blog suele alternar: un `H2` como título de sección, varios `P` de desarrollo, y de vez en cuando un `UL` para enumerar consejos.

---

#### Sección 3 — `Bloque de enlaces internos`

Es el recuadro que aparece al final del artículo con enlaces hacia otras páginas del sitio (los treatments, por ejemplo).

| Campo en pantalla | Qué es |
|---|---|
| `Titulo` | Encabezado del recuadro (ej.: `Ready to slow down?`) |
| `Texto` | Texto introductorio del recuadro |
| Botón `+ Anadir enlace` | Agrega una fila de enlace |
| Botón `Quitar` | Elimina esa fila |

Cada fila de enlace tiene dos campos:

| Campo | Qué escribir | Ejemplo |
|---|---|---|
| `Texto del enlace` | Lo que el lector verá y puede presionar | `Explore Treatments` |
| Destino (`/in-home-massage`) | La ruta interna de la página | `/#treatments` o `/in-home-massage` |

> **Importante:** escribe **rutas internas** que empiecen con `/` (por ejemplo `/#treatments`). Si escribes un dominio externo, el enlace saldrá del sitio.

---

#### Sección 4 — `Tarjeta del listado`

Cada artículo aparece como **tarjeta** en el listado del blog. Estos campos controlan cómo se ve allí, y **son independientes** del contenido del artículo.

| Campo en pantalla | Qué es | Si lo dejas vacío |
|---|---|---|
| `Titulo de la tarjeta` | Título corto de la tarjeta | Se usa el `Titulo (H1)` del artículo |
| `Texto de la tarjeta` | Texto corto de la tarjeta | Se usa la `Entradilla` |
| `Texto de imagen de la tarjeta` | Texto o etiqueta de la imagen de la tarjeta | Se muestra el `Texto de la imagen decorativa` |
| `Categoria (filtro)` | Define bajo qué filtro del blog aparece | Se asume `wellness` |

##### Valores de `Categoria (filtro)`

| Valor | Significado |
|---|---|
| `wellness` | Bienestar general |
| `sayulita` | Contenido específico de Sayulita |
| `massage` | Contenido sobre masajes |

> Estos son los **únicos tres** valores aceptados. Si por error llegara otro, el sistema lo corrige a `wellness` sin avisar.

##### `Orden`

| Campo | Qué es |
|---|---|
| `Orden` | Posición en el listado del blog. **Un número menor aparece primero.** Puedes usar `0`, `1`, `2`… o el orden que prefieras |

##### `Mostrar como tarjeta destacada (grande)`

| Casilla | Efecto |
|---|---|
| **Marcada** | La tarjeta se muestra en formato grande y destacada en el listado del blog. Úsala para el artículo principal |
| **Sin marcar** | Tarjeta normal |

> **Recomendación:** mantén **una sola tarjeta destacada**. Si marcas varias, el blog puede verse recargado.

---

#### Sección 5 — `Firma, CTA y SEO`

##### Firma (aparece al final del artículo)

| Campo | Qué es | Ejemplo |
|---|---|---|
| `Firma — nombre` | Nombre que firma el artículo | `Luna Spa` *(valor por defecto)* |
| `Firma — descripcion` | Frase corta bajo el nombre | `Wellness & bodywork in Sayulita` |

##### CTA — llamado a la acción (botón al final del artículo)

| Campo | Qué es | Ejemplo |
|---|---|---|
| `CTA — titulo` | Encabezado del bloque final. **Si lo dejas vacío, el bloque no aparece** | `Ready to slow down?` |
| `CTA — texto` | Texto debajo del encabezado | `Book your in-home massage` |
| `CTA — texto del boton` | Texto del botón | `Explore Treatments` |
| `CTA — destino` | A dónde lleva el botón | `/#treatments` |

> **Importante:** el bloque CTA **solo se muestra si `CTA — titulo` tiene contenido**.

##### SEO (cómo aparece el artículo en Google y al compartirlo en redes)

| Campo | Qué es |
|---|---|
| `Titulo SEO` | Título que aparece en los resultados de búsqueda. Si lo dejas vacío se usa `"{Titulo} — Luna Spa"` |
| `Descripcion SEO` | Descripción corta bajo el título en buscadores. Si la dejas vacía se usa la `Entradilla` |
| `Imagen para redes (og:image)` | Dirección de la imagen que se muestra al compartir el enlace |

##### `Estado` y guardado

| Campo | Valores | Efecto |
|---|---|---|
| `Estado` | `draft` / `published` | `draft` = **no se ve en el sitio**. `published` = **visible en el blog** |

Cuando el artículo se publica por primera vez, el sistema registra automáticamente la fecha y hora de publicación, que **no cambia** aunque lo vuelvas a `draft` y lo publiques de nuevo.

> **Recomendación de trabajo:** publica primero como `draft`, revisa la `Vista previa`, y solo cuando esté listo cambia a `published`.

---

### 6.3 Imágenes

#### Formatos y límites

| Aspecto | Valor |
|---|---|
| Formatos aceptados | JPG, PNG, WEBP |
| Tamaño máximo del archivo original | **8 MB** |
| Lado máximo de la imagen final | **2000 px** |
| Formato en que se guarda | **WEBP** siempre |
| Peso objetivo del archivo final | ~400 KB |

#### Qué hace el sistema automáticamente

Al subir una imagen, el panel:

1. Verifica que sea realmente una imagen (no confía en la extensión).
2. Corrige la orientación de las fotos de celular (las verticales ya no salen acostadas).
3. Reduce el tamaño si excede 2000 px.
4. Convierte a WEBP y optimiza el peso.
5. Le asigna un nombre interno propio. **Tus archivos nunca se nombran ni se sobrescriben directamente en el disco.**

#### Reemplazar o quitar la imagen

Cuando el artículo ya tiene una imagen de portada, aparecen dos controles adicionales:

- **Seleccionar un archivo nuevo** → reemplaza la imagen actual. La anterior se elimina.
- **Casilla `Quitar la imagen actual`** → elimina la imagen y el artículo vuelve a mostrar el degradado de color.
- **No hacer nada y guardar** → se conserva la imagen actual.

#### Mensajes de error al subir

| Mensaje | Causa | Solución |
|---|---|---|
| `La imagen supera el maximo de 8 MB.` | El archivo pesa demasiado | Reduce el peso de la imagen y vuelve a subirla |
| `Formato no permitido. Usa JPG, PNG o WEBP.` | El archivo no es de esos formatos | Conviértela a JPG, PNG o WEBP |
| `El archivo esta danado o no es una imagen valida.` | El archivo está corrupto o no es una imagen | Vuelve a exportarla |
| `La subida fallo o el archivo excede el limite del servidor.` | Archivo corrupto o límite del servidor | Prueba con otro archivo de menor peso |
| `La imagen tiene demasiados pixeles para procesarla en este servidor.` | Imagen muy grande | Reduce las dimensiones antes de subirla |

> **Nota:** cuando hay un error de imagen, **no se guarda nada del artículo**. Vuelve al formulario con todo lo que habías escrito y corrige el archivo.

---

### 6.4 Guardar el artículo

1. Presiona **Guardar articulo**.
2. Aparecerá un mensaje verde: `Articulo creado.` o `Articulo actualizado.`
3. El sistema **te deja en el mismo formulario**, ahora como artículo existente. Puedes seguir editándolo y volver a guardar.

#### ⚠️ Comportamiento crítico del guardado

> Al guardar, el sistema **reemplaza por completo** la lista de bloques del cuerpo y la lista de enlaces internos por lo que tengas escrito en ese momento.
>
> Esto significa que:
> - Si borras un bloque y guardas, **desaparece** del artículo.
> - **No existe historial de versiones ni botón "deshacer".** Lo que se borró, se borró.
> - Antes de guardar una versión ya publicada que te importa, **anota el contenido en un archivo externo** o haz una copia antes de los cambios grandes.

#### Errores de guardado

| Mensaje | Causa | Solución |
|---|---|---|
| `El titulo es obligatorio.` | Dejaste vacío el `Titulo (H1)` | Escribe el título |
| `El articulo no existe.` | El artículo fue borrado por otro usuario mientras editabas | Regresa al listado |

---

### 6.5 Vista previa

**Cómo llegar:** desde el listado, botón `Vista previa` de la fila; o desde el formulario de edición, botón `Vista previa` en la parte superior.

Se abre en una pestaña nueva y muestra:

- Una franja informativa: `Asi se vera el articulo en el blog. El contenido sale de la base de datos, exactamente como lo consumira el frontend React en /blog/{slug}.`
- El artículo tal como aparecerá en el sitio: portada, antetítulo, título, entradilla, imagen, bloques de cuerpo, enlaces internos, firma y CTA.

**Usa la vista previa antes de publicar.** Es la única forma de comprobar el resultado real.

Botones disponibles en la vista previa:

| Botón | Para quién | Qué hace |
|---|---|---|
| `Editar` | Todos | Regresa al formulario |
| `Ver como JSON` | Solo `admin` | Abre `/api/posts/{slug}` en una pestaña nueva: el dato exacto que consume el sitio |

> La vista previa funciona **tanto para borradores como para publicados**: puedes revisar un borrador sin necesidad de publicarlo.

---

### 6.6 Editar un artículo

**Cómo llegar:** `Articulos` → botón `Editar` de la fila correspondiente.

El formulario se abre con todo el contenido cargado. Es exactamente el mismo formulario del apartado 6.2. Presiona **Guardar articulo** para aplicar los cambios.

---

### 6.7 Borrar un artículo

1. En el listado, presiona el botón rojo `Borrar` de la fila.
2. El navegador pide confirmación: `¿Eliminar este articulo y todos sus bloques?`
3. Si confirmas, el artículo y todo su contenido se eliminan **de forma permanente**.

> **Advertencia:** esta acción **no se puede deshacer**. No hay papelera ni copia de seguridad desde el panel. Verifica el título antes de confirmar.

Al terminar, el sistema muestra `Articulo eliminado.` y regresa al listado.

---

### 6.8 Resumen del flujo de trabajo de un artículo

```
   Articulos  →  + Nuevo articulo
                       |
      Escribir contenido en las 5 secciones
      (Estado = draft para trabajar tranquilo)
                       |
              Guardar articulo
                       |
          (repetir tantas veces como se necesite)
                       |
                Vista previa
                       |
          ¿Todo correcto y listo?
            |                    |
           No → Editar         Sí → Estado = published
                                          |
                                  Guardar articulo
                                          |
                                 YA ESTÁ EN EL BLOG
```

---

## 7. Módulo Comentarios

### 7.1 ¿De dónde vienen los comentarios?

Los comentarios y reseñas los escriben los clientes desde el formulario público `/reviews-score` del sitio. **Cada comentario llega siempre con estado `Pendiente`** y **no es visible en el sitio hasta que un editor lo aprueba**.

Tú no escribes comentarios: **los revisas y decides**.

### 7.2 Pantalla de listado

**Cómo llegar:** menú superior → `Comentarios`.

#### Tarjetas de resumen

| Tarjeta | Significado |
|---|---|
| `comentarios` | Total de comentarios recibidos |
| `Por revisar` | Comentarios que esperan una decisión (**prioriza estos**) |
| `Publicados` | Comentarios visibles en la página `/reviews` del sitio |
| `Rechazados` | Comentarios rechazados (se conservan, **no se borran**) |
| `Media publicada` | Promedio de puntuación de los comentarios publicados |

#### Filtros

Hay pestañas para filtrar, cada una con su contador:

| Pestaña | Muestra |
|---|---|
| `Todos` | Todos los comentarios, sin filtro |
| `Pendiente` | Solo los que esperan decisión |
| `Publicada` | Solo los visibles en el sitio |
| `Rechazada` | Solo los rechazados |

#### La tabla de comentarios

| Columna | Contenido |
|---|---|
| **Autor** | Nombre que escribió la persona. Debajo, su ciudad (o `—` si no la indicó) |
| **Comentario** | Título del comentario y los primeros 90 caracteres del texto |
| **Puntaje** | Promedio de las cinco calificaciones, sobre 5. Ej.: `4.6 / 5` |
| **Tratamiento** | El tipo de massage que eligió el cliente, o `—` si no lo indicó |
| **Estado** | `Pendiente`, `Publicada` o `Rechazada` |
| **Recibido** | Fecha y hora en que llegó el comentario |
| **Acción** | Botón `Revisar` (si está pendiente) o `Ver` (si ya tiene decisión) |

> **Consejo:** empieza siempre por la pestaña `Pendiente`. El número que aparece en la tarjeta `Por revisar` te dice cuántos te están esperando.

#### Botón `Ver API`

Solo para `admin`. Abre `/api/reviews` en una pestaña nueva: **solo contiene los comentarios publicados**, en JSON. Es la forma de verificar qué está saliendo realmente en el sitio.

#### Estado vacío

- Sin filtro: `Todavia no ha llegado ningun comentario desde el formulario.`
- Con filtro: `No hay comentarios en estado {estado}.`

---

### 7.3 Pantalla de detalle del comentario

**Cómo llegar:** botón `Revisar` o `Ver` de cualquier fila.

#### Tarjetas de resumen

| Tarjeta | Contenido |
|---|---|
| `Puntaje general` | Promedio de las cinco calificaciones |
| `Estado` | Estado actual del comentario |
| `Recibido` | Fecha en que llegó |

#### Datos del cliente

| Dato | Notas |
|---|---|
| **Autor** | Nombre mostrado públicamente |
| **Vive en** | Ciudad que indicó el cliente, o `no indicado` |
| **Correo** | **Dato sensible.** Úsalo solo si necesitas responderle al cliente. **Nunca se publica en el sitio** |
| **Fecha de la experiencia** | Cuándo tuvo la experiencia, o `—` |
| **Moderado por** | El usuario del panel que tomó la última decisión. Aparece solo si ya fue moderado |

#### Texto del comentario

El título y el texto completo del cliente se muestran dentro de una caja destacada.

#### Las cinco calificaciones

El cliente califica cinco aspectos, de 1 a 5 estrellas. Las verás con estrellas llenas y vacías (`★★★★☆`):

| Aspecto | Qué evalúa |
|---|---|
| `Value for Money` | Relación calidad-precio |
| `Service` | Calidad del servicio |
| `Staff` | Trato del personal |
| `Karma Points` | (Aspecto propio de Luna Spa) |
| `Good Vibes` | Ambiente y sensación general |

#### Nota privada del cliente

Si aparece un recuadro `Nota privada para el equipo — nunca se publica`, **es texto que escribió el cliente en el formulario**. Trátalo como información interna y sensible: no lo copies a ninguna página pública.

---

### 7.4 Tomar una decisión de moderación

Esta es la tarjeta `Decision`, al final de la pantalla de detalle.

#### Los tres campos

| Campo | Valores | Para qué sirve |
|---|---|---|
| `Estado` | `Pendiente` / `Publicada` / `Rechazada` | Decide si el comentario se muestra en el sitio |
| `Filtrar en /reviews como` | `— Sin filtro (aparece en "Todos") —`, `In-Home`, `Couples`, `Deep Tissue`, `Grupos` | Clasifica el comentario para los filtros de la página `/reviews`. Si no eliges ninguno, aparece en la sección **Todos** |
| `Nota interna (opcional)` | Texto libre | **Anotación de tu equipo.** Nunca se publica. Útil para recordar por qué se aprobó o rechazó, o para coordinar respuestas |

#### Procedimiento

1. Lee el comentario completo y las cinco calificaciones.
2. Elige el **Estado**:

| Estado | Efecto en el sitio | Úsalo cuando |
|---|---|---|
| `Publicada` | **Aparece en `/reviews`** | El comentario es auténtico, respetuoso y está relacionado con una experiencia real |
| `Rechazada` | **No aparece**, pero se conserva en el panel | El comentario es inapropiado, es spam o contiene datos que no deben hacerse públicos. **Prefiere siempre marcarlo como `Rechazada` antes que borrarlo**: así queda registro |
| `Pendiente` | No aparece | Todavía no lo has decidido, o quieres dejar constancia de que estaba en revisión |

3. *(Opcional)* Elige el **tratamiento** si el cliente eligió alguno en el formulario.
4. *(Opcional)* Escribe la **nota interna**.
5. Presiona **Guardar decision**.
6. El sistema registra automáticamente **quién** tomó la decisión y **cuándo**, y muestra un mensaje verde: `Resena marcada como {estado}.`

> **Buenas prácticas de moderación:**
> - Publica las reseñas positivas y las constructivas. La moderación no debe usarse para ocultar críticas.
> - Publica también las reseñas de 4 o 5 estrellas que señalen algo negativo (por ejemplo, "el massage llegó tarde"), siempre que describan una experiencia real: generan credibilidad.
> - Rechaza solo spam, contenido abusivo o reseñas de alguien que no fue cliente.
> - **No borres un comentario para callar una queja.** Usa `Rechazada` y anota el motivo en la nota interna.

#### Efectos secundarios de la decisión

| Situación | Qué ocurre |
|---|---|
| Publicas por primera vez | Se registra la **fecha de aprobación**, que es la que se muestra en el sitio |
| Pasas a `Publicada` un comentario que ya lo estaba | **Conserva** la fecha de aprobación original |
| Pasas a `Pendiente` o `Rechazada` | Se **borra la fecha de publicación**. Si después lo apruebas de nuevo, se registra una fecha nueva |
| Quieres corregir tu decisión anterior | Vuelve a abrir el comentario, cambia el `Estado` y presiona `Guardar decision` otra vez |

#### Errores

| Mensaje | Causa |
|---|---|
| `La resena no existe.` | Fue eliminada por otro usuario mientras la abriste |
| `Estado de moderacion no valido.` | Valor de estado no reconocido (no debería ocurrir desde la interfaz) |

---

### 7.5 Eliminar un comentario

1. En la pantalla de detalle, busca el botón rojo `Eliminar comentario`, debajo de la tarjeta `Decision`.
2. El navegador pide confirmación: `¿Eliminar este comentario de forma permanente?`
3. Si confirmas, el comentario se elimina **de forma definitiva**, incluyendo el texto, el correo del cliente y todo su historial.

> **Advertencia:** a diferencia del flujo de moderación, **eliminar no deja registro**. Para poder consultar después qué pasó con un comentario, usa `Rechazada` en lugar de `Eliminar comentario`.
>
> **Considera el dato personal:** el correo del cliente es un dato personal. Si eliminas o rechazas una reseña, la política de privacidad del sitio puede exigir que se borre ese registro. Consulta con el administrador del sitio antes de una eliminación masiva.

Al terminar, el sistema muestra `Resena eliminada.` y regresa al listado.

---

## 8. Módulo Usuarios

> **Este módulo completo es exclusivo del rol `admin`.**
> Los `editor` no ven el enlace `Usuarios` en el menú y, si escriben la URL directamente, el sistema responde con un error `403 Se requiere rol de administrador.`

### 8.1 Pantalla de listado

**Cómo llegar:** menú superior → `Usuarios`.

#### La tabla de usuarios

| Columna | Contenido |
|---|---|
| **Usuario** | Nombre de usuario. Tu propia cuenta aparece marcada con `(tu)` |
| **Correo** | Correo electrónico de la cuenta |
| **Rol** | `admin` o `editor` |
| **Estado** | `activo` o `inactivo`. Una cuenta `inactiva` **no puede iniciar sesión** |
| **Ultimo acceso** | Fecha y hora del último inicio de sesión, o `nunca` si jamás ha entrado |

#### Acciones por fila

| Botón | Notas |
|---|---|
| `Editar` | Abre el formulario con los datos cargados |
| `Borrar` | Elimina la cuenta. **No aparece en tu propia fila.** Pide confirmación |

> **Consejo:** en lugar de borrar a alguien que deja de trabajar, **desactiva su cuenta**. Así conserva su historial y no se pierde la trazabilidad de qué usuario creó o moderó cada contenido.

---

### 8.2 Crear un usuario

**Cómo llegar:** `Usuarios` → botón `+ Nuevo usuario`.

#### Campos del formulario

| Campo | Obligatorio | Qué escribir | Notas |
|---|---|---|---|
| `Usuario` | **Sí** | Identificador de inicio de sesión | **Debe ser único.** Se recomienda entre 3 y 60 caracteres. Evita espacios, tildes y caracteres especiales: usa letras, números, punto, guion y guion bajo |
| `Correo` | **Sí** | Correo electrónico | **Debe ser único** y con formato válido (ejemplo: `nombre@dominio.com`). **También sirve para iniciar sesión**, así que escribe el correo real del usuario |
| `Nombre completo` | No | Nombre y apellido | Se usa para saludar al entrar (`Hola, {nombre}.`) y para construir las iniciales del avatar. Si se deja vacío, se usan las iniciales del usuario |
| `Contrasena` | **Sí** (solo al crear) | Contraseña inicial | **Mínimo 8 caracteres.** Se recomienda más largo |
| `Rol` | **Sí** | `admin` o `editor` | `editor` para el equipo de contenido. `admin` solo para quienes gestionarán cuentas |
| `Cuenta activa` | No | Casilla marcada | Si se guarda **sin marcar**, la cuenta existe pero **nadie puede entrar con ella** |

#### Procedimiento

1. Completa `Usuario`, `Correo` y `Contrasena`.
2. Elige el `Rol`.
3. Deja marcada `Cuenta activa` (a menos que quieras crearla desactivada para configurarla después).
4. Presiona **Guardar usuario**.
5. Aparecerá el mensaje verde `Usuario creado.` y quedarás en el formulario de edición de esa cuenta.

#### Errores

| Mensaje | Causa | Solución |
|---|---|---|
| `Usuario y correo son obligatorios.` | Alguno de los dos campos quedó vacío | Complétalos |
| `El correo no tiene un formato valido.` | El correo está mal escrito | Revísalo (no debe tener espacios ni faltar el `@`) |
| `Ese nombre de usuario ya esta en uso.` | El nombre de usuario ya existe | Elige otro |
| `Ese correo ya esta registrado.` | El correo ya está asociado a otra cuenta | Usa otro correo |
| `La contrasena debe tener al menos 8 caracteres.` | La contraseña es demasiado corta | Usa una de 8 caracteres o más |

> **Buenas prácticas al crear cuentas:**
> - Crea **una cuenta por persona**, nunca compartida. Las sesiones y el historial de "último acceso" solo son útiles si identifican a un responsable.
> - Asigna el rol `admin` **solo si la persona realmente gestionará cuentas**.
> - Entrega las credenciales de forma individual y **pide que las cambie en su primer acceso** (edición de la cuenta → campo `Nueva contrasena`).
> - **Nunca reutilices la contraseña de un usuario que ya no trabaja.** Desactiva su cuenta y crea una nueva para quien lo siga.

---

### 8.3 Editar un usuario

**Cómo llegar:** `Usuarios` → botón `Editar` de la fila correspondiente.

El formulario es el mismo. Presiona **Guardar usuario** para aplicar los cambios. Aparecerá `Usuario actualizado.`

#### Cambiar la contraseña de otro usuario

En el formulario de edición, el campo se llama **`Nueva contrasena (opcional)`**:

- **Déjalo vacío** → la contraseña no cambia.
- **Escribe una nueva** (mínimo 8 caracteres) → la contraseña se reemplaza al guardar.

Al terminar verás el mensaje verde `Usuario actualizado.` (el mismo que aparece cuando cambias cualquier otro dato).

> **Importante:** cambiar la contraseña de otro usuario **no cierra su sesión actual**. Si la preocupación es la seguridad, pídele que cierre sesión con `Salir` y vuelva a entrar, o desactiva y reactiva su cuenta.

#### Cambiar el rol

Selecciona `admin` o `editor` en el campo `Rol` y guarda. El cambio aplica **de inmediato**: la siguiente vez que esa persona navegue, verá (o dejará de ver) el enlace `Usuarios` en el menú.

> Si un `admin` que estás editando **no es la última cuenta `admin` activa del sistema**, puedes degradarlo a `editor` o desactivarlo libremente. El sistema protege al equipo de quedarse sin administradores (ver 8.5).

#### Desactivar una cuenta

**Desmarca `Cuenta activa`** y guarda.

Efectos:

- El usuario **no puede iniciar sesión** desde ese momento.
- Si tenía una sesión abierta, **se cierra automáticamente** en cuanto intente continuar trabajando.
- La cuenta y todo su historial **permanecen** en el sistema.
- Puedes reactivarla marcando de nuevo la casilla.

---

### 8.4 Borrar un usuario

1. En el listado, presiona el botón rojo `Borrar` de la fila.
2. El navegador pide confirmación: `¿Eliminar este usuario?`
3. Si confirmas, la cuenta se elimina **de forma permanente**.

> **Advertencia:** esta acción **no se puede deshacer**. Considera usar la desactivación en su lugar para conservar el historial.
>
> **Nota técnica:** el sistema no impide borrar a un usuario que creó o moderó contenido. Ese contenido seguirá existiendo, pero quedarán sin un responsable identificable. Para mantener la trazabilidad, **desactiva en lugar de borrar**.

Al terminar, el sistema muestra `Usuario eliminado.` y regresa al listado.

#### Errores

| Mensaje | Causa | Solución |
|---|---|---|
| `No puedes eliminar tu propia cuenta.` | Intentas borrar tu propia cuenta | **Esto es intencional.** Pide a otro `admin` que lo haga, o desactiva tu cuenta desde otro administrador |
| `Debe quedar al menos un administrador activo.` | Borrar o degradar esta cuenta dejaría al sistema sin ningún `admin` | Crea o designa primero otro `admin`, y después elimina esta cuenta |
| `El usuario no existe.` | La cuenta fue borrada por otro `admin` mientras editabas | Regresa al listado |

---

### 8.5 Protección del sistema: siempre un administrador activo

El panel impide que el equipo se quede sin acceso total. Estas operaciones son rechazadas con el mensaje `Debe quedar al menos un administrador activo.`:

- Degradar a `editor` al **único** `admin` activo.
- Desactivar al **único** `admin` activo.
- Borrar al **último** `admin` activo.

> **Cómo salir de un bloqueo:** crea un nuevo usuario con rol `admin` **antes** de degradar, desactivar o borrar el que tenías. Siempre trabaja con al menos dos `admin` activos.

### 8.6 Matriz de referencia rápida

| Acción | `admin` | `editor` |
|---|:---:|:---:|
| Crear artículo | Sí | Sí |
| Editar / borrar artículo | Sí | Sí |
| Ver vista previa | Sí | Sí |
| Ver, moderar y borrar comentarios | Sí | Sí |
| Ver la API JSON | Sí | No |
| Ver la lista de usuarios | Sí | No |
| Crear un usuario | Sí | No |
| Editar usuario / cambiar contraseña | Sí | No |
| Cambiar roles | Sí | No |
| Desactivar o activar una cuenta | Sí | No |
| Borrar un usuario | Sí | No |

---

## 9. Mensajes y errores frecuentes

Esta tabla resume los mensajes que verás en el panel y qué hacer ante cada uno.

| Módulo | Mensaje | Significado | Solución |
|---|---|---|---|
| Acceso | `Usuario o contrasena incorrectos.` | Credenciales inválidas o cuenta desactivada | Verifica mayúsculas y espacios; si persiste, avisa al admin |
| Acceso | `Demasiados intentos fallidos. Intenta de nuevo en N minuto(s).` | 5 intentos fallidos bloquean 15 min | Espera los minutos indicados |
| Acceso | `Inicia sesion para continuar.` | Sesión no vigente | Vuelve a iniciar sesión |
| Acceso | `Hola, {nombre}.` | Inicio de sesión exitoso | — |
| Acceso | `Sesion cerrada.` | Sesión finalizada correctamente | — |
| General | `Se requiere rol de administrador.` (error 403) | Intentaste abrir `Usuarios` sin ser `admin` | Es la protección funcionando; usa un rol `admin` |
| Artículos | `Articulo creado.` | Artículo guardado por primera vez | — |
| Artículos | `Articulo actualizado.` | Cambios guardados | — |
| Artículos | `Articulo eliminado.` | Artículo borrado | — |
| Artículos | `El titulo es obligatorio.` | Falta el `Titulo (H1)` | Escribe el título y vuelve a guardar |
| Artículos | `El articulo no existe.` | Fue borrado por otro usuario mientras editabas | Regresa al listado |
| Artículos | `La imagen supera el maximo de 8 MB.` | Archivo demasiado pesado | Optimiza la imagen |
| Artículos | `Formato no permitido. Usa JPG, PNG o WEBP.` | Formato no admitido | Convierte a JPG, PNG o WEBP |
| Artículos | `El archivo esta danado o no es una imagen valida.` | Archivo corrupto | Vuelve a exportarlo |
| Artículos | `La subida fallo o el archivo excede el limite del servidor.` | Fallo de subida | Prueba con un archivo más ligero |
| Artículos | `La imagen tiene demasiados pixeles para procesarla en este servidor.` | Imagen con demasiados píxeles | Reduce las dimensiones antes de subir |
| Comentarios | `Resena marcada como {estado}.` | Decisión guardada | — |
| Comentarios | `Resena eliminada.` | Comentario eliminado | — |
| Comentarios | `La resena no existe.` | Fue eliminada mientras la abriste | Regresa al listado |
| Usuarios | `Usuario creado.` | Cuenta creada | — |
| Usuarios | `Usuario actualizado.` | Cambios guardados | — |
| Usuarios | `Contrasena actualizada.` | Contraseña reemplazada (mensaje interno del sistema; desde la interfaz normalmente verás `Usuario actualizado.`) | — |
| Usuarios | `Usuario eliminado.` | Cuenta borrada | — |
| Usuarios | `Usuario y correo son obligatorios.` | Campo requerido vacío | Complétalos |
| Usuarios | `El correo no tiene un formato valido.` | Correo mal formado | Revísalo |
| Usuarios | `Ese nombre de usuario ya esta en uso.` | Nombre duplicado | Elige otro |
| Usuarios | `Ese correo ya esta registrado.` | Correo duplicado | Usa otro |
| Usuarios | `La contrasena debe tener al menos 8 caracteres.` | Contraseña corta | Usa una de 8 caracteres o más |
| Usuarios | `No puedes eliminar tu propia cuenta.` | Borrar tu propia cuenta | Pide a otro `admin` que lo haga |
| Usuarios | `Debe quedar al menos un administrador activo.` | Protección del sistema | Crea otro `admin` primero |
| Usuarios | `El usuario no existe.` | La cuenta ya no está | Regresa al listado |

---

## 10. Buenas prácticas

### 10.1 Flujo de trabajo de artículos

1. **Trabaja siempre en `draft` primero.** El formulario de artículo nuevo aparece con `published` seleccionado: cámbialo antes de guardar.
2. **Usa la vista previa siempre** antes de pasar a `published`.
3. **Escribe primero el título y decide el slug.** Si lo dejas vacío, el sistema lo genera automáticamente y garantiza que no se repita; si te importa que la URL se lea bien, escríbelo a mano (ver el apartado del slug en la sección 6.2).
4. **Guarda con frecuencia** si trabajas en artículos largos, pero recuerda que cada guardado reemplaza los bloques: no borres un bloque pensando que "se conserva" hasta el guardado final.
5. **Antes de una publicación que ya está online, guarda una copia del contenido** fuera del panel. Si borras un bloque y guardas, no hay vuelta atrás.
6. **Revisa la vista previa en móvil.** Ajusta imágenes y subtítulos pensando en la pantalla del teléfono.
7. **Usa la `Vista previa` para revisar borradores**: funciona igual sin necesidad de publicar.

### 10.2 Organización del listado del blog

- **Un solo artículo destacado** a la vez. La casilla `Mostrar como tarjeta destacada (grande)` es para el artículo principal.
- **Distribuye los números de `Orden`** con espacios (por ejemplo 10, 20, 30). Así puedes insertar un artículo nuevo entre dos sin renumerar todo.
- **Completa la `Entradilla`.** Es el texto que se ve en buscadores y en las tarjetas.
- **Completa el bloque `Firma`.** Da credibilidad al artículo.
- **Rellena los campos SEO.** Si los dejas vacíos, el sistema usa el título y la entradilla como valores por defecto, lo cual es aceptable pero no está optimizado.

### 10.3 Moderación de comentarios

- **Atiende primero los `Pendientes`.** Los clientes dejan una reseña esperando respuesta.
- **Publica las reseñas negativas auténticas.** Una reseña de 3 estrellas con un comentario respetuoso genera más confianza que un tablero lleno de 5 estrellas perfectas.
- **Rechaza en lugar de borrar.** Así queda registro de la decisión y puedes recuperarla.
- **Usa `Rechazada` para spam o contenido abusivo**, y anota el motivo en la `Nota interna` para que el equipo lo sepa.
- **Clasifica con `Filtrar en /reviews como`.** Si no lo haces, el comentario solo aparecerá en `Todos` y será más difícil de encontrar en la página pública.
- **Trata los datos personales con cuidado.** El correo del cliente nunca debe copiarse a ninguna página pública ni usarse para iniciar campañas de marketing sin su consentimiento.
- **No modifiques el texto de un cliente.** Si hay un error tipográfico, guarda el original tal cual en la nota interna.

### 10.4 Gestión de cuentas

- **Una cuenta por persona.** Nunca se comparte.
- **El rol `editor` es el adecuado** para el equipo de contenido. Usa `admin` con criterio.
- **Mantén siempre al menos dos `admin` activos** para no quedarte sin acceso.
- **Desactiva en lugar de borrar** cuando alguien deja de trabajar: conserva el historial.
- **Entrega las credenciales individualmente** y pide que las cambie en el primer acceso.
- **No uses el correo real del cliente** para crear cuentas del panel.

### 10.5 Seguridad

- **Verifica siempre el candado del navegador** antes de ingresar tu contraseña.
- **Cierra sesión con `Salir`** al terminar, especialmente si trabajas en un equipo compartido.
- **No compartas tus credenciales**, ni siquiera con un colega de confianza.
- **Si sospechas que tu cuenta fue usada por alguien más**, cambia tu contraseña de inmediato y avisa al administrador técnico.

---

## 11. Anexo A — Referencia rápida de valores

### A.1 Estado de artículo

| Valor | En pantalla | Visible en el blog |
|---|---|:---:|
| `draft` | `draft` | No |
| `published` | `published` | Sí |

### A.2 Categoría de artículo

| Valor | Significado |
|---|---|
| `wellness` | Bienestar general |
| `sayulita` | Contenido sobre Sayulita |
| `massage` | Contenido sobre masajes |

### A.3 Tipos de bloque

| Valor | En pantalla | Campo a llenar |
|---|---|---|
| `p` | `P` | Texto del bloque |
| `h2` | `H2` | Texto del bloque |
| `h3` | `H3` | Texto del bloque |
| `ul` | `UL` | Un elemento por linea |
| `ol` | `OL` | Un elemento por linea |
| `quote` | `QUOTE` | Texto del bloque |

### A.4 Estado de comentario

| Valor | En pantalla | Visible en `/reviews` |
|---|---|:---:|
| `pending` | `Pendiente` | No |
| `published` | `Publicada` | Sí |
| `rejected` | `Rechazada` | No |

### A.5 Tratamiento del comentario (filtro en `/reviews`)

| Valor | En pantalla |
|---|---|
| (vacío) | `— Sin filtro (aparece en "Todos") —` |
| `home` | `In-Home` |
| `couples` | `Couples` |
| `deep` | `Deep Tissue` |
| `group` | `Grupos` |

### A.6 Aspectos calificados

| Clave | En pantalla |
|---|---|
| `rate_value` | `Value for Money` |
| `rate_service` | `Service` |
| `rate_staff` | `Staff` |
| `rate_karma` | `Karma Points` |
| `rate_vibes` | `Good Vibes` |

### A.7 Roles del panel

| Valor | En pantalla | Acceso |
|---|---|---|
| `admin` | `admin` | Todo, incluida la gestión de usuarios |
| `editor` | `editor` | Artículos y comentarios |

---

## 12. Anexo B — API JSON (solo `admin`)

> **¿Para qué sirve esto?** Esta sección es de **verificación técnica**. Sirve para confirmar que el sitio está recibiendo exactamente lo que publicaste, y para diagnosticar problemas. **No necesitas hacer nada desde aquí en el uso normal del panel.**

Estos enlaces se abren en una pestaña nueva del navegador.

| Enlace | Qué devuelve |
|---|---|
| Menú `API JSON` o botón `Ver API` (en Artículos) | `/api/posts` — Lista de tarjetas de todos los artículos **publicados**, con los filtros disponibles |
| Botón `Ver como JSON` (en la vista previa de un artículo) | `/api/posts/{slug}` — El artículo completo: contenido, bloques, enlaces, SEO. Si el artículo es un `draft`, devolverá un error `404` |
| Botón `Ver API` (en Comentarios) | `/api/reviews` — Solo los comentarios **publicados** |

### Cómo usarlos para verificar

1. Publica un artículo.
2. Abre `/api/posts` y comprueba que tu artículo aparece.
3. Abre `/api/posts/{slug}` y verifica que el contenido es el que escribiste.
4. Si el artículo no aparece, revisa que su `Estado` sea `published`.
5. Después de unos minutos, recarga el sitio y confirma que el cambio ya se refleja en el blog.

### Datos que **nunca** se exponen públicamente

- El **correo electrónico** de quien deja un comentario.
- La **nota privada** del cliente.
- Las **notas internas** de moderación.
- Los **artículos en borrador**.
- Los **comentarios pendientes o rechazados**.

> Esta es una decisión de diseño deliberada: aunque el sistema solo publica lo aprobado, los datos sensibles se mantienen fuera de la respuesta pública por completo.

---

## 13. Anexo C — Procedimientos para el administrador técnico

> Esta sección requiere acceso al servidor o a una terminal. **No es necesaria para el uso diario del panel.**

### C.1 Crear el primer usuario (cuando la base de datos está vacía)

En una instalación nueva **no existe ninguna cuenta**, y no hay forma de entrar al panel para crear la primera. El único punto de acceso inicial es la terminal del servidor:

```bash
# En Docker (producción)
docker compose exec -it web php spark users:create

# En una instalación local
cd backend
php spark users:create
```

El proceso es interactivo y te pedirá:

| Dato que te pide el sistema | Regla |
|---|---|
| `Usuario` | De 3 a 60 caracteres: letras, números, punto, guion y guion bajo. Sin espacios |
| `Correo electronico` | Formato válido. También sirve para iniciar sesión |
| `Nombre completo` | Opcional. Si lo dejas vacío, se usa el nombre de usuario |
| `Rol` | `admin` o `editor` |
| `Contrasena (se vera mientras escribes)` | **Mínimo 10 caracteres** (más estricto que el panel) |
| `Repite la contrasena` | Debe coincidir exactamente |

También se puede ejecutar sin preguntas:

```bash
docker compose exec web php spark users:create \
  --username=nuevoadmin \
  --email=admin@ejemplo.com \
  --name="Nombre Apellido" \
  --password="UnaContrasenaLarga2026" \
  --password-confirm="UnaContrasenaLarga2026" \
  --role=admin
```

> **Importante:** si pasas `--password` a mano, **debes pasar también `--password-confirm`**. De lo contrario, el comando avisa y se detiene: es una protección contra errores de tipeo que no se pueden detectar a ciegas.

Al terminar muestra un resumen con el identificador del usuario, su nombre de usuario, su correo y su rol.

### C.2 Verificación de la instalación

| Qué verificar | Cómo |
|---|---|
| El backend responde | Abre `/api/reviews` — debe devolver JSON |
| El panel carga | Abre `/dashboard/login` — debe mostrar la pantalla de acceso |
| Los estilos cargan | Si el panel aparece sin estilos, el archivo `dashboard.css` no se está sirviendo |
| El sitio público funciona | Abre `/reviews` — el formulario de comentarios debe aparecer |

### C.3 Mantenimiento periódico

| Tarea | Frecuencia sugerida |
|---|---|
| Revisar la carpeta de imágenes subidas (`public/uploads/blog/`) | Trimestral |
| Desactivar cuentas del personal que dejó de trabajar | Cuando ocurra |
| Rotar la contraseña de las cuentas `admin` | Semestral |
| Verificar que no queden artículos en `draft` olvidados | Mensual |
| Respaldar la base de datos y las imágenes subidas | Según la política del sitio |

---

## 14. Glosario

| Término | Significado |
|---|---|
| **Backend** | La parte del sistema que guarda los datos y administra el contenido (CodeIgniter 4) |
| **Frontend** | La parte del sistema que ve el visitante (React) |
| **API** | El mecanismo por el cual el sitio público obtiene el contenido del panel |
| **Panel / Dashboard** | Esta aplicación de administración |
| **Slug** | La parte final de la URL de un artículo: `/blog/mi-articulo` |
| **Entradilla** | Texto introductorio de un artículo, debajo del título |
| **Antetítulo / Eyebrow** | Texto pequeño que aparece sobre el título |
| **Bloque** | Unidad de contenido del cuerpo de un artículo (párrafo, subtítulo, lista o cita) |
| **CTA** | "Llamado a la acción": el bloque final con un botón que invita al lector a actuar |
| **Tarjeta** | La representación resumida de un artículo en el listado del blog |
| **Destacado** | Artículo que se muestra como tarjeta grande en el listado |
| **Reseña / Comentario** | Valoración que deja un cliente desde `/reviews-score` |
| **Moderación** | Proceso de revisar y decidir si un comentario se publica |
| **Filtro por tratamiento** | Clasificación del comentario según el tipo de massage |
| **Guardar** | Persistir los cambios en la base de datos |
| **Borrar** | Eliminar un registro de forma permanente e irreversible |
| **Desactivar** | Impedir el acceso a una cuenta sin eliminar su historial |
| **`admin`** | Rol con acceso completo, incluida la gestión de cuentas |
| **`editor`** | Rol con acceso a artículos y comentarios, sin gestión de cuentas |
| **`draft`** | Artículo guardado pero no visible en el sitio |
| **`published`** | Artículo visible en el sitio |

---

## 15. Control de cambios del documento

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 02/10/2026 | Emisión inicial del manual de usuario del panel de contenido de Luna Spa | — |

---

**¿Encontraste algo que no coincide con el sistema?** Todos los mensajes y comportamientos descritos en este manual se verificaron directamente contra el código fuente del backend. Si algo no se comporta como se indica, reporta el caso para actualizar este documento.