import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import AnchorLink from "../components/AnchorLink";
import WellnessGuide from "./WellnessGuide";
import { fetchArticle } from "../lib/api";

function ArticleContent({ data }) {
  return (
    <article className="wg-article">
      <section className="wg-section">
        <div className="wg-article-hero">
          <div>
            <div className="wg-eyebrow">{data.eyebrow}</div>
            <h1>{data.title}</h1>
            <p>{data.lead}</p>
          </div>
          <div className="wg-photo">
            {data.photoImage ? (
              <img
                className="wg-cover"
                src={data.photoImage}
                alt={data.photo || data.title}
                loading="lazy"
              />
            ) : (
              data.photo
            )}
          </div>
        </div>
        <div className="wg-body">
          {data.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "ul") {
              return (
                <ul key={i}>
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block.text}</p>;
          })}
          <div className="wg-internal">
            <h3>{data.internal.title}</h3>
            <p>{data.internal.text}</p>
            {data.internal.links.map((link) => (
              <AnchorLink key={link.to + link.label} to={link.to}>
                {link.label}
              </AnchorLink>
            ))}
          </div>
        </div>
        {data.signature.name !== "" && (
          <div className="wg-signature">
            <strong>{data.signature.name}</strong>
            {data.signature.role !== "" && <em>{data.signature.role}</em>}
          </div>
        )}
        {data.cta.heading !== "" && (
          <div className="wg-article-cta">
            <h3>{data.cta.heading}</h3>
            {data.cta.text !== "" && <p>{data.cta.text}</p>}
            <AnchorLink className="wg-btn wg-btn-primary" to={data.cta.to}>
              {data.cta.label}
            </AnchorLink>
          </div>
        )}
      </section>
    </article>
  );
}

export default function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [state, setState] = useState("loading");
  const closeRef = useRef(null);

  function closeModal() {
    navigate("/wellness-guide");
  }

  useEffect(() => {
    let alive = true;
    setState("loading");

    fetchArticle(slug)
      .then((data) => {
        if (!alive) return;
        setArticle(data);
        setState("ready");
      })
      .catch(() => {
        if (!alive) return;
        setArticle(null);
        setState("missing");
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") navigate("/wellness-guide");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  useEffect(() => {
    if (state === "missing") {
      navigate("/wellness-guide", { replace: true });
    }
  }, [state, navigate]);

  useEffect(() => {
    if (state === "missing") return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prev;
    };
  }, [state]);

  // El modal se monta desde el click, sin esperar la respuesta: antes solo
  // aparecia cuando la API terminaba de cargar y el clic se percibia como un
  // retardo. Con el articulo ya en cache (prefetch) se pinta de inmediato.
  if (state === "missing") {
    return <WellnessGuide />;
  }

  return (
    <>
      <WellnessGuide />
      {article && (
        <Seo
          title={article.seo.title || `${article.title} — Luna Spa`}
          description={article.seo.description || article.lead}
        />
      )}
      <div
        className="wg-modal-backdrop"
        onClick={closeModal}
        role="dialog"
        aria-modal="true"
        aria-label={article?.title || slug}
      >
        <div className="wg-modal" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            ref={closeRef}
            className="wg-modal-close"
            onClick={closeModal}
            aria-label="Close article"
          >
            ×
          </button>
          {article ? (
            <div className="wellness-guide">
              <ArticleContent data={article} />
            </div>
          ) : (
            <p className="wg-modal-loading" role="status">
              Loading the guide…
            </p>
          )}
        </div>
      </div>
    </>
  );
}
