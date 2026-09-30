import { Link } from "react-router-dom";
import AnchorLink from "./AnchorLink";

export default function ServiceCard({ treatment }) {
  const t = treatment;
  return (
    <article className="card service-card service-anchor" id={t.id}>
      <div className="card-top">
        <div>
          <span className="kicker">Luna Spa Treatment</span>
          <h3>{t.name}</h3>
          {t.badge && <span className="badge">{t.badge}</span>}
        </div>
        <span className="price-pill">{t.duration}</span>
      </div>
      <p>{t.description}</p>
      <div className="price-row">
        <div>
          <div className="price">{t.price}</div>
          <div className="duration">{t.duration} treatment</div>
        </div>
        {t.href ? (
          <Link className="btn btn-primary" to={`/${t.href}`}>
            {"View & Book"}
          </Link>
        ) : (
          <AnchorLink className="btn btn-primary" to={`/#${t.id}`}>
            {"View & Book"}
          </AnchorLink>
        )}
      </div>
    </article>
  );
}