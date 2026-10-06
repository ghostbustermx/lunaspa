/**
 * Cliente de la API de articulos (CodeIgniter 4 + MySQL).
 *
 * En desarrollo Vite sirve la app en otro puerto, por lo que el proxy de
 * vite.config.js redirige /lunaspa/backend al Apache local y la misma ruta
 * relativa funciona en dev y en el build servido por Apache.
 */

const RAW_BASE = import.meta.env.VITE_API_BASE_URL ?? "/lunaspa/backend/public/api";

export const API_BASE = RAW_BASE.replace(/\/+$/, "");

async function getJson(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" }
  });

  if (!res.ok) {
    throw new Error(`La API respondio ${res.status} al pedir ${path}`);
  }

  return res.json();
}

/**
 * Cache de promesas para no repetir peticiones al montar el listado y el
 * articulo a la vez (la pagina de blog reutiliza el componente de listado).
 */
const pending = new Map();

function cached(key, loader) {
  if (!pending.has(key)) {
    pending.set(
      key,
      loader().catch((err) => {
        pending.delete(key);
        throw err;
      })
    );
  }

  return pending.get(key);
}

function normalizeCard(raw) {
  return {
    id: raw.id,
    slug: raw.slug,
    to: raw.to,
    cat: raw.cat,
    featured: Boolean(raw.featured),
    img: raw.img ?? "",
    photoImage: raw.photoImage || null,
    catLabel: raw.catLabel ?? "",
    title: raw.title ?? "",
    text: raw.text ?? "",
    publishedAt: raw.publishedAt ?? null
  };
}

function normalizeArticle(raw) {
  return {
    id: raw.id,
    slug: raw.slug,
    eyebrow: raw.eyebrow ?? "",
    title: raw.title ?? "",
    lead: raw.lead ?? "",
    photo: raw.photo ?? "",
    photoImage: raw.photoImage || null,
    body: Array.isArray(raw.body) ? raw.body : [],
    internal: {
      title: raw.internal?.title ?? "",
      text: raw.internal?.text ?? "",
      links: Array.isArray(raw.internal?.links) ? raw.internal.links : []
    },
    signature: {
      name: raw.signature?.name ?? "",
      role: raw.signature?.role ?? ""
    },
    cta: {
      heading: raw.cta?.heading ?? "",
      text: raw.cta?.text ?? "",
      label: raw.cta?.label ?? "",
      to: raw.cta?.to ?? "/"
    },
    seo: {
      title: raw.seo?.title ?? "",
      description: raw.seo?.description ?? "",
      ogImage: raw.seo?.ogImage ?? ""
    }
  };
}

/** Tarjetas del listado, ya en el formato que espera la rejilla. */
export function fetchCards() {
  return cached("cards", async () => {
    const json = await getJson("/posts");

    return Array.isArray(json.data) ? json.data.map(normalizeCard) : [];
  });
}

/** Un articulo completo por slug. */
export function fetchArticle(slug) {
  return cached(`post:${slug}`, async () => {
    const json = await getJson(`/posts/${encodeURIComponent(slug)}`);

    return normalizeArticle(json.data ?? {});
  });
}

/**
 * Precarga un articulo para que al abrirlo el modal aparezca de inmediato.
 * El resultado queda en la cache de `fetchArticle`, asi que al hacer clic no
 * se repite la peticion. Los errores se ignoran: aqui solo se busca quitar la
 * espera, y un fallo real se reporta igual desde `fetchArticle`.
 */
export function prefetchArticle(slug) {
  if (!slug) return;

  fetchArticle(slug).catch(() => {});
}

function normalizeReview(raw) {
  return {
    id: raw.id,
    score: Number(raw.score ?? 0),
    ratings: {
      value: raw.ratings?.value ?? 0,
      service: raw.ratings?.service ?? 0,
      staff: raw.ratings?.staff ?? 0,
      karma: raw.ratings?.karma ?? 0,
      vibes: raw.ratings?.vibes ?? 0
    },
    title: raw.title ?? "",
    body: raw.body ?? "",
    name: raw.name ?? "",
    location: raw.location ?? "",
    date: raw.date ?? null,
    // Vacio cuando el equipo aun no lo ha encasillado en un filtro.
    treatment: raw.treatment ?? "",
    publishedAt: raw.publishedAt ?? null
  };
}

/**
 * Resenas publicadas para la pagina /reviews.
 *
 * Sin cache a proposito: el listado cambia cuando el equipo aprueba o rechaza
 * un comentario, y una copia vieja dejaria tarjetas desactualizadas.
 */
export function fetchReviews() {
  return fetch(`${API_BASE}/reviews`, {
    headers: { Accept: "application/json" },
    cache: "no-store"
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `La API respondio ${res.status} al pedir las resenas`
        );
      }

      return res.json();
    })
    .then((json) =>
      Array.isArray(json.data) ? json.data.map(normalizeReview) : []
    );
}

/**
 * Envia un comentario de /reviews-score.
 *
 * El backend no publica nada: lo guarda como pendiente y el equipo decide
 * desde el dashboard. Por eso la excepcion solo llega cuando el envio falla
 * de verdad, y el formulario nunca muestra si quedo publicado o no.
 */
export async function submitReview(payload) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload)
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    // 422 trae el detalle campo a campo; el resto solo trae un mensaje.
    throw new Error(json.error ?? `No pudimos enviar tu comentario (${res.status}).`);
  }

  return json;
}

/**
 * Envia la solicitud de cita del formulario "View & Book".
 *
 * El backend no guarda nada: arma el correo y lo manda al equipo (con copia
 * oculta al webmaster). En 422 el error trae `fields` campo a campo para que
 * el formulario pueda marcar cada invalido donde corresponde.
 */
export async function submitBooking(payload) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload)
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(
      json.error ?? `We could not send your request (${res.status}).`
    );
    error.fields = json.errors ?? null;
    error.status = res.status;
    throw error;
  }

  return json;
}
