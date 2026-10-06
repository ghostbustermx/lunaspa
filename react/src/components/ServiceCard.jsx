import { useState } from "react";
import { Link } from "react-router-dom";
import BookingModal from "./BookingModal";

export default function ServiceCard({ treatment }) {
  const [booking, setBooking] = useState(false);
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
      {t.recommended && (
        <div className="duration" style={{ marginTop: 8 }}>
          {t.recommended}
        </div>
      )}
      <div className="price-row">
        <div>
          <div className="price">{t.price}</div>
          <div className="duration">{t.duration} treatment</div>
          {t.price90 && <div className="duration">{t.price90}</div>}
        </div>
        {t.href ? (
          <Link className="btn btn-primary" to={`/${t.href}`}>
            {"View & Book"}
          </Link>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setBooking(true)}
            >
              {"View & Book"}
            </button>
            {booking && (
              <BookingModal treatment={t} onClose={() => setBooking(false)} />
            )}
          </>
        )}
      </div>
    </article>
  );
}