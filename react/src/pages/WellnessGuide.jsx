import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import AnchorLink from "../components/AnchorLink";
import { scrollToId } from "../lib/effects";
import { fetchCards, prefetchArticle } from "../lib/api";
import "./WellnessGuide.css";

const FILTERS = [
  { key: "all", label: "All Guides" },
  { key: "wellness", label: "Wellness" },
  { key: "sayulita", label: "Sayulita" },
  { key: "massage", label: "Massage" }
];

// El listado solo muestra las entradas mas recientes de cada categoria.
const LATEST_PER_CATEGORY = 1;

/** MySQL devuelve "2026-09-25 14:30:00"; Date.parse no lo lee en todos lados. */
function toTime(value) {
  if (!value) return 0;

  const parsed = Date.parse(String(value).replace(" ", "T"));

  return Number.isNaN(parsed) ? 0 : parsed;
}

/** "2026-09-25 19:01:32" -> "25 sep 2026". */
function formatDate(value) {
  const time = toTime(value);

  if (!time) return "";

  return new Date(time).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

/** Mas reciente primero; el id desempata cuando dos posts comparten fecha. */
function byNewest(a, b) {
  return toTime(b.publishedAt) - toTime(a.publishedAt) || b.id - a.id;
}

/**
 * Deja solo las `perCategory` entradas mas recientes de cada categoria.
 */
function latestPerCategory(cards, perCategory = LATEST_PER_CATEGORY) {
  const taken = new Map();
  const picked = [];

  for (const card of [...cards].sort(byNewest)) {
    const key = card.cat || "other";
    const used = taken.get(key) ?? 0;

    if (used >= perCategory) continue;

    taken.set(key, used + 1);
    picked.push(card);
  }

  return picked;
}

export default function WellnessGuide() {
  const [filter, setFilter] = useState("all");
  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;

    fetchCards()
      .then((data) => {
        if (!alive) return;
        setCards(data);
        setStatus(data.length > 0 ? "ready" : "empty");
      })
      .catch((err) => {
        if (!alive) return;
        setError(err.message);
        setStatus("error");
      });

    return () => {
      alive = false;
    };
  }, []);

  function openArticle(card) {
    navigate(card.to || `/blog/${card.slug}`);
  }

  // El modal del articulo se abre al instante si el articulo ya llego. Con solo
  // precargar al hacer clic la espera seguiria siendo visible, asi que se pide
  // en cuanto el puntero o el foco llegan a la tarjeta.
  function warmCard(card) {
    prefetchArticle(card.slug);
  }

  // "All Guides" muestra solo la entrada mas reciente de cada categoria, con la
  // destacada a la izquierda. Al pulsar una categoria se abre su historico
  // completo: la mas reciente a la izquierda y el resto, de mas nuevo a mas
  // antiguo, a la derecha.
  const inCategory = cards.filter((card) => card.cat === filter).sort(byNewest);
  const isCategory = filter !== "all";
  const shown = isCategory ? inCategory : latestPerCategory(cards);

  const hero = isCategory ? shown.slice(0, 1) : shown.filter((c) => c.featured);
  const list = isCategory ? shown.slice(1) : shown.filter((c) => !c.featured);

  return (
    <div className="wellness-guide">
      <Seo
        title="The Sayulita Wellness Guide — Luna Spa"
        description="Wellness ideas, local inspiration and thoughtful ways to slow down before, during and after your time in Sayulita."
      />

      <section className="wg-hero">
        <div className="wg-hero-inner">
          <div className="wg-eyebrow">Luna Spa presents</div>
          <h1>
            The Sayulita
            <br />
            Wellness Guide
          </h1>
          <p>
            <em>Your guide to feeling your best in Sayulita.</em>
          </p>
          <p style={{ marginTop: 12 }}>
            Wellness ideas, local inspiration and thoughtful ways to slow
            down before, during and after your time in Sayulita.
          </p>
          <div className="wg-actions">
            <a
              className="wg-btn wg-btn-primary"
              href="#articles"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("articles");
              }}
            >
              Explore the Guides
            </a>
            <AnchorLink className="wg-btn wg-btn-secondary" to="/">
              Explore Luna Spa
            </AnchorLink>
          </div>
          <div className="wg-hero-media">
            <img
              src={`${import.meta.env.BASE_URL}assets/wellness_guide_hero.webp`}
              alt="The Sayulita Wellness Guide"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="wg-section" id="articles">
        <div className="wg-head">
          <div className="wg-eyebrow">Editorial hub</div>
          <h2>Slow down. Explore. Feel better.</h2>
          <p>
            Wellness inspiration for your time in Sayulita.
          </p>
        </div>
        <div className="wg-pills">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={"wg-pill" + (filter === f.key ? " active" : "")}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        {status === "loading" && (
          <p className="wg-status">Loading the guides…</p>
        )}

        {status === "error" && (
          <p className="wg-status wg-status--error">
            We could not load the guides right now. Please try again later.
            {error ? ` (${error})` : ""}
          </p>
        )}

        {status === "empty" && (
          <p className="wg-status">No guides have been published yet.</p>
        )}

        {status === "ready" && hero.length + list.length === 0 && (
          <p className="wg-status">No guides have been published in this category yet.</p>
        )}

        {status === "ready" && hero.length + list.length > 0 && (
          <div className="wg-grid">
            {hero.map((card) => (
              <button
                key={card.slug}
                type="button"
                className="wg-card wg-featured"
                onClick={() => openArticle(card)}
                onMouseEnter={() => warmCard(card)}
                onFocus={() => warmCard(card)}
                onTouchStart={() => warmCard(card)}
              >
                <div className="wg-img">
                  {card.photoImage ? (
                    <img
                      className="wg-cover"
                      src={card.photoImage}
                      alt={card.title}
                      loading="lazy"
                    />
                  ) : (
                    card.img
                  )}
                </div>
                <div className="wg-copy">
                  <div className="wg-cat">{card.catLabel}</div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <span className="wg-read">Read Guide →</span>
                </div>
              </button>
            ))}
            <div className="wg-stack">
              {list.map((card) =>
                isCategory ? (
                  <button
                    key={card.slug}
                    type="button"
                    className="wg-row"
                    onClick={() => openArticle(card)}
                    onMouseEnter={() => warmCard(card)}
                    onFocus={() => warmCard(card)}
                    onTouchStart={() => warmCard(card)}
                  >
                    <div className="wg-cat">{card.catLabel}</div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <div className="wg-row-foot">
                      <span className="wg-read">Read Guide →</span>
                      <span className="wg-row-date">{formatDate(card.publishedAt)}</span>
                    </div>
                  </button>
                ) : (
                  <button
                    key={card.slug}
                    type="button"
                    className="wg-card"
                    onClick={() => openArticle(card)}
                    onMouseEnter={() => warmCard(card)}
                    onFocus={() => warmCard(card)}
                    onTouchStart={() => warmCard(card)}
                  >
                    <div className="wg-img">
                      {card.photoImage ? (
                        <img
                          className="wg-cover"
                          src={card.photoImage}
                          alt={card.title}
                          loading="lazy"
                        />
                      ) : (
                        card.img
                      )}
                    </div>
                    <div className="wg-copy">
                      <div className="wg-cat">{card.catLabel}</div>
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                      <span className="wg-read">Read Guide →</span>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}