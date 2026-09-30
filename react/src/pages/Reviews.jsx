import { useEffect, useMemo, useState } from "react";
import { fetchReviews } from "../lib/api";
import { LINKS } from "../lib/site";

const BASE = import.meta.env.BASE_URL;

const PHOTOS = [
  { src: `${BASE}assets/capsule_1-1.webp`, label: "Real experience" },
  { src: `${BASE}assets/capsule_2-1.webp`, label: "Sayulita setting" },
  { src: `${BASE}assets/capsule_3-1.webp`, label: "Wellness moment" }
];

const FILTERS = ["all", "home", "couples", "deep", "group"];

const FILTER_LABELS = {
  all: "All guests",
  home: "In-Home",
  couples: "Couples",
  deep: "Deep Tissue",
  group: "Groups"
};

/** Cuantas caben en la columna lateral sin estirar la portada. */
const SIDE_LIMIT = 3;

/** Estrellas a partir de la media, para no prometer siempre un 5. */
function Stars({ score }) {
  if (!score) return null;

  const filled = Math.round(score);

  return (
    <span className="stars">
      <span aria-hidden="true">
        {"★".repeat(filled)}
        {"☆".repeat(5 - filled)}
      </span>
      <span className="rv-sr"> {score.toFixed(1)} de 5</span>
    </span>
  );
}

/** Letra del avatar a partir del nombre que eligio el huesped. */
function initial(name) {
  return (name.trim().charAt(0) || "G").toUpperCase();
}

/**
 * Insignia de aprobado. La API publica solo reseñas con status "published",
 * es decir, que alguien del equipo las leyo y aprobo desde el panel, asi que
 * mostrarla en toda esta pagina es correcto. Si alguna vez se llegara a listar
 * una reseña sin aprobar, habria que condicionar el badge a review.status.
 */
function VerifiedBadge() {
  return (
    <span className="verified">
      <span className="check" aria-hidden="true">
        ✓
      </span>
      Verified Client
    </span>
  );
}

/** "2026-09-20" -> "20 Sep 2026". El T00:00:00 evita el salto de dia por zona. */
function formatDate(value) {
  if (!value) return "";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

/** Linea de creditos: donde vive y cuando vino, mas el filtro asignado. */
function sourceLine(review) {
  return [
    review.location,
    formatDate(review.date),
    review.treatment ? FILTER_LABELS[review.treatment] : ""
  ]
    .filter(Boolean)
    .join(" · ");
}

const INTENTS = [
  {
    key: "home",
    num: "01",
    title: "In-Home Massage",
    text: "At your villa, rental or hotel room"
  },
  {
    key: "couples",
    num: "02",
    title: "Couples Massage",
    text: "A private session for two"
  },
  {
    key: "deep",
    num: "03",
    title: "Deep Tissue Massage",
    text: "Focused pressure for real tension"
  },
  {
    key: "group",
    num: "04",
    title: "Group Massage",
    text: "Retreats, friends and family"
  }
];

const LEVELS = [
  {
    num: "01 · Written by guests",
    title: "Real people, real sessions",
    text: "Submitted by guests who booked a treatment at Luna Spa in Sayulita. We do not write testimonials for the business."
  },
  {
    num: "02 · Read before publishing",
    title: "Approved by our team",
    text: "Every submission is read by a person on the Luna Spa team and only published when it describes a real experience."
  },
  {
    num: "03 · Labelled by treatment",
    title: "Filter what matters to you",
    text: "Published reviews are tagged In-Home, Couples, Deep Tissue or Groups, so you can read the closest experience to yours."
  }
];

export default function Reviews() {
  const [filter, setFilter] = useState("all");
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading");

  // Sin cache en el cliente: si el equipo publica o rechaza algo, al volver
  // a la pagina tiene que verse el cambio.
  useEffect(() => {
    let alive = true;

    fetchReviews()
      .then((data) => {
        if (!alive) return;
        setReviews(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!alive) return;
        setReviews([]);
        setStatus("error");
      });

    return () => {
      alive = false;
    };
  }, []);

  // En "all" entran tambien las resenas sin filtro asignado, para que ninguna
  // quede escondida por no haberla encasillado todavia.
  const visible = useMemo(
    () =>
      filter === "all"
        ? reviews
        : reviews.filter((review) => review.treatment === filter),
    [reviews, filter]
  );

  const featured = visible[0];
  const side = visible.slice(1, 1 + SIDE_LIMIT);
  // Reviews que la API devuelve para este filtro pero no caben en pantalla.
  const overflow = visible.length - 1 - side.length;

  const average = useMemo(
    () =>
      reviews.length
        ? reviews.reduce((sum, review) => sum + review.score, 0) /
          reviews.length
        : 0,
    [reviews]
  );

  function applyFilter(value) {
    setFilter(value);
  }

  function applyFilterAndScroll(value) {
    setFilter(value);
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="reviews-page">
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(248,252,253,.72),rgba(248,252,253,.72)), url(${BASE}assets/reviews_hero.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="hero-inner fade">
          <div className="hero-badge">
            {average > 0 ? (
              <>
                <span className="stars">
                  <span aria-hidden="true">
                    {"★".repeat(Math.round(average))}
                    {"☆".repeat(5 - Math.round(average))}
                  </span>
                </span>
                <strong>
                  {average.toFixed(1)} from {reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"}
                </strong>
              </>
            ) : (
              <strong>Guest experiences are coming soon</strong>
            )}
          </div>
          <div className="kicker" style={{ marginTop: 28 }}>
            Real experiences · Genuine relaxation
          </div>
          <h1>
            Loved by guests
            <br />
            in Sayulita.
          </h1>
          <p>
            Guests share their experience after their session. We read every
            review before it appears here, so what you read below is what they
            actually experienced with us.
          </p>
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="section-head">
          <div className="eyebrow">Guest Reviews</div>
          <h2>Real experiences. Genuine relaxation.</h2>
          <p>
            Every comment here was written by a guest and reviewed by the Luna
            Spa team before it went live.
          </p>
          <div className="pill-row">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={"pill" + (filter === f ? " active" : "")}
                aria-pressed={filter === f}
                onClick={() => applyFilter(f)}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>
        </div>

        {status === "loading" && (
          <p className="rv-note">Loading guest reviews…</p>
        )}

        {status === "error" && (
          <p className="rv-note rv-note--err">
            We couldn&apos;t load the reviews right now. Please try again in a
            moment.
          </p>
        )}

        {status === "ready" && visible.length === 0 && (
          <div className="rv-empty">
            <h3>
              {filter === "all"
                ? "No reviews yet."
                : `No reviews for ${FILTER_LABELS[filter]} yet.`}
            </h3>
            <p>
              {filter === "all"
                ? "Be the first to tell future guests what Luna Spa is like."
                : "Try another filter, or be the first to review this experience."}
            </p>
            <a className="btn" href="/reviews-score">
              Share your experience →
            </a>
          </div>
        )}

        {status === "ready" && featured && (
          <>
            <div
              className={
                "review-layout" + (side.length === 0 ? " is-solo" : "")
              }
            >
              <article className="featured fade">
                <div>
                  <div className="featured-top">
                    <span className="tag">
                      {featured.treatment
                        ? FILTER_LABELS[featured.treatment]
                        : "Guest review"}
                    </span>
                    {side.length === 0 && <Stars score={featured.score} />}
                  </div>
                  <div className="quote-mark">“</div>
                  <blockquote>{featured.body}</blockquote>
                </div>
                <div className="meta">
                  <div className="avatar">{initial(featured.name)}</div>
                  <div>
                    <strong>{featured.name}</strong>
                    <span>{sourceLine(featured)}</span>
                    <VerifiedBadge />
                  </div>
                </div>
              </article>

              <div className="side">
                {side.map((review) => (
                  <article className="card review-card" key={review.id}>
                    <div className="card-top">
                      <Stars score={review.score} />
                      <VerifiedBadge />
                    </div>
                    {review.title && (
                      <h3 className="review-title">{review.title}</h3>
                    )}
                    <p>{review.body}</p>
                    <div className="source">
                      <strong>{review.name}</strong>
                      {sourceLine(review) ? ` · ${sourceLine(review)}` : ""}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <p className="rv-note rv-count">
              Showing {1 + side.length} of {visible.length} published reviews
              {overflow > 0
                ? ` · ${overflow} more${
                    filter === "all" ? "" : ` in ${FILTER_LABELS[filter]}`
                  }`
                : ""}
            </p>
          </>
        )}

        <div className="rv-share">
          <a className="btn" href="/reviews-score">
            Share your experience →
          </a>
        </div>

        <div className="photo-grid">
          {PHOTOS.map((photo) => (
            <figure className="photo" key={photo.src}>
              <img
                src={photo.src}
                alt={photo.label}
                loading="lazy"
                draggable="false"
              />
              <span>{photo.label}</span>
            </figure>
          ))}
        </div>
      </section>

      <section className="section alt" id="intent">
        <div className="intent-section">
          <div className="intent-copy">
            <div className="eyebrow">Find your treatment</div>
            <h3>Start with the experience you are looking for.</h3>
            <p>
              Not every guest books the same massage. Choose a treatment and we
              will take you straight to the reviews that describe it, with the
              details that matter for that particular session.
            </p>
          </div>
          <div className="intent-list">
            {INTENTS.map((item) => (
              <div
                className="intent-item"
                key={item.num}
                onClick={() => applyFilterAndScroll(item.key)}
              >
                <div className="intent-icon">{item.num}</div>
                <div>
                  <strong>{item.title}</strong>
                  <br />
                  <span>{item.text}</span>
                </div>
                <div className="arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div className="eyebrow">How we handle reviews</div>
          <h2>Every review here went through us first.</h2>
          <p>
            Nothing on this page is automatic. A person reads each submission,
            decides whether to publish it, and labels the treatment so you can
            find the experience closest to yours.
          </p>
        </div>
        <div className="review-layout levels">
          {LEVELS.map((level) => (
            <article className="card" key={level.num}>
              <div className="eyebrow">{level.num}</div>
              <h3
                style={{ color: "var(--navy-rv)" }}
              >
                {level.title}
              </h3>
              <p className="level-text">{level.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="cta">
        <div className="cta">
          <div className="cta-inner">
            <div className="eyebrow" style={{ color: "var(--sky-rv)" }}>
              Book your session
            </div>
            <h2>Ready for your own turn on the table?</h2>
            <p style={{ color: "#dceaf2" }}>
              Tell us the treatment you are after and where you are staying,
              and we will take care of the rest — in-home or in our space in
              Sayulita.
            </p>
            <a
              className="btn"
              href={LINKS.bookMassage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book on WhatsApp →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}