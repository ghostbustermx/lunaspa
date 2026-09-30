import { useState } from "react";
import Seo from "../components/Seo";
import { submitReview } from "../lib/api";
import "./ReviewsScore.css";

const RATING_AREAS = [
  { key: "value", label: "Value for Money" },
  { key: "service", label: "Service" },
  { key: "staff", label: "Staff" },
  { key: "karma", label: "Karma Points" },
  { key: "vibes", label: "Good Vibes" }
];

const TITLE_MAX = 90;
const REVIEW_MAX = 1200;
const PRIVATE_MAX = 600;
const NAME_MAX = 50;
const LOCATION_MAX = 80;

const EMPTY_RATINGS = RATING_AREAS.reduce((acc, area) => {
  acc[area.key] = 0;
  return acc;
}, {});

const EMPTY_FORM = {
  title: "",
  review: "",
  privateNote: "",
  email: "",
  name: "",
  location: "",
  date: ""
};

/** Texto del marcador de progreso segun cuantas areas llevan calificacion. */
function progressWidth(ratings) {
  const rated = Object.values(ratings).filter(Boolean).length;
  return 20 + rated * 16;
}

/** Promedio de las areas calificadas, o 0 si todavia no hay ninguna. */
function averageScore(ratings) {
  const rated = Object.values(ratings).filter(Boolean);
  if (rated.length === 0) return 0;
  return rated.reduce((sum, value) => sum + value, 0) / rated.length;
}

function scoreLabel(avg) {
  if (avg >= 4.5) return "Exceptional experience";
  if (avg >= 3.5) return "Very good experience";
  if (avg >= 2.5) return "Good experience";
  if (avg > 0) return "Needs improvement";
  return "Select your ratings";
}

export default function ReviewsScore() {
  const [ratings, setRatings] = useState(EMPTY_RATINGS);
  const [form, setForm] = useState(EMPTY_FORM);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [trap, setTrap] = useState("");

  const avg = averageScore(ratings);

  function rate(key, value) {
    setRatings((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  /** Mismo orden de validaciones que la plantilla original. */
  function validate() {
    if (Object.values(ratings).some((value) => !value)) {
      return "Please rate all five areas.";
    }
    if (form.title.trim().length < 3) {
      return "Please add a review title.";
    }
    if (form.review.trim().length < 20) {
      return "Please write a little more about your experience.";
    }
    if (!form.email.trim()) {
      return "Please add your email address.";
    }
    if (!form.name.trim()) {
      return "Please add a display name.";
    }
    if (!form.date) {
      return "Please add the date of your experience.";
    }
    if (!agree) {
      return "Please accept the review guidelines.";
    }
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const problem = validate();

    if (problem) {
      setError(problem);
      return;
    }

    setError("");
    setSending(true);

    try {
      await submitReview({
        rate_value: ratings.value,
        rate_service: ratings.service,
        rate_staff: ratings.staff,
        rate_karma: ratings.karma,
        rate_vibes: ratings.vibes,
        title: form.title.trim(),
        body: form.review.trim(),
        private_note: form.privateNote.trim(),
        email: form.email.trim(),
        display_name: form.name.trim(),
        location: form.location.trim(),
        experience_date: form.date,
        website: trap
      });

      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  function resetForm() {
    setRatings(EMPTY_RATINGS);
    setForm(EMPTY_FORM);
    setAgree(false);
    setError("");
    setSent(false);
    setTrap("");
  }

  return (
    <div className="reviews-score">
      <Seo
        title="Share Your Luna Spa Experience"
        description="Tell us how your Luna Spa treatment felt in Sayulita. Rate the experience, share your story and help future guests discover what Luna Spa is like."
      />

      <section className="rs-hero">
        <div>
          <div className="rs-ey">Luna Spa · Sayulita, Mexico</div>
          <h1>Share Your Luna Spa Experience</h1>
          <p>
            Your experience matters to us. Tell us how your treatment felt,
            what you enjoyed, and what we can continue improving.
          </p>
        </div>
      </section>

      {/* El <main> real lo aporta Layout; aqui solo va la caja del formulario. */}
      <div className="rs-wrap">
        <section className="rs-card">
          <div className="rs-bar">
            <span
              style={{
                width: sent ? "100%" : `${progressWidth(ratings)}%`
              }}
            />
          </div>

          {sent ? (
            <div className="rs-success">
              <div className="rs-ey">Thank you</div>
              <h2>Your experience has been shared.</h2>
              <p>
                Thank you for taking a moment to tell us about your Luna Spa
                experience. Your feedback helps us care for every guest with
                the same attention and warmth.
              </p>
              <p className="rs-hint">
                Our team reads every comment before it appears on the reviews
                page, so yours will show up there soon.
              </p>
              <button
                type="button"
                className="rs-btn rs-btn-primary"
                onClick={resetForm}
              >
                Write Another Review
              </button>
            </div>
          ) : (
            <div className="rs-body">
              <div className="rs-step">Your experience</div>
              <h2 className="rs-title">A few words can mean a lot.</h2>
              <p className="rs-intro">
                Rate the experience, share your story, and help future guests
                discover what Luna Spa is like.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                {/* Campo trampa: los bots lo rellenan, las personas no lo ven. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    opacity: 0
                  }}
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                />
                <div className="rs-field">
                  <span className="rs-label">
                    How would you rate your experience?
                  </span>
                  <div className="rs-ratings">
                    {RATING_AREAS.map((area) => (
                      <div className="rs-rate" key={area.key}>
                        <span className="rs-rate-name">{area.label}</span>
                        <div
                          className="rs-stars"
                          role="group"
                          aria-label={area.label}
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              type="button"
                              className={
                                "rs-star" +
                                (value <= ratings[area.key] ? " is-on" : "")
                              }
                              aria-label={`${area.label}: ${value} of 5`}
                              aria-pressed={value === ratings[area.key]}
                              onClick={() => rate(area.key, value)}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rs-overall">
                    <div className="rs-score">
                      {avg ? avg.toFixed(1) : "—"}
                    </div>
                    <div>
                      <b>{scoreLabel(avg)}</b>
                      <br />
                      <span className="rs-hint">
                        Your overall score updates as you rate each area.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rs-field">
                  <label className="rs-label" htmlFor="rs-title">
                    Review title
                  </label>
                  <input
                    id="rs-title"
                    className="rs-input"
                    maxLength={TITLE_MAX}
                    value={form.title}
                    placeholder='Example: "A beautiful way to relax in Sayulita"'
                    onChange={(e) => updateField("title", e.target.value)}
                  />
                </div>

                <div className="rs-field">
                  <label className="rs-label" htmlFor="rs-review">
                    Your review
                  </label>
                  <textarea
                    id="rs-review"
                    className="rs-textarea"
                    maxLength={REVIEW_MAX}
                    value={form.review}
                    placeholder="Tell us what you enjoyed about your Luna Spa experience..."
                    onChange={(e) => updateField("review", e.target.value)}
                  />
                  <div className="rs-hint">
                    {form.review.length}/{REVIEW_MAX} characters
                  </div>
                </div>

                <div className="rs-field">
                  <label className="rs-label" htmlFor="rs-private">
                    Personal note to Luna Spa <small>(optional)</small>
                  </label>
                  <textarea
                    id="rs-private"
                    className="rs-textarea"
                    maxLength={PRIVATE_MAX}
                    style={{ minHeight: 100 }}
                    value={form.privateNote}
                    placeholder="Private feedback for the Luna Spa team. This will not appear publicly."
                    onChange={(e) =>
                      updateField("privateNote", e.target.value)
                    }
                  />
                </div>

                <div className="rs-field rs-two">
                  <div>
                    <label className="rs-label" htmlFor="rs-email">
                      Email address
                    </label>
                    <input
                      id="rs-email"
                      className="rs-input"
                      type="email"
                      value={form.email}
                      placeholder="you@example.com"
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="rs-label" htmlFor="rs-name">
                      Display name
                    </label>
                    <input
                      id="rs-name"
                      className="rs-input"
                      maxLength={NAME_MAX}
                      value={form.name}
                      placeholder="Example: JamieL"
                      onChange={(e) => updateField("name", e.target.value)}
                    />
                  </div>
                </div>

                <div className="rs-field rs-two">
                  <div>
                    <label className="rs-label" htmlFor="rs-location">
                      Where do you live?
                    </label>
                    <input
                      id="rs-location"
                      className="rs-input"
                      maxLength={LOCATION_MAX}
                      value={form.location}
                      placeholder="Portland, Oregon, USA"
                      onChange={(e) => updateField("location", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="rs-label" htmlFor="rs-date">
                      Date of experience
                    </label>
                    <input
                      id="rs-date"
                      className="rs-input"
                      type="date"
                      value={form.date}
                      onChange={(e) => updateField("date", e.target.value)}
                    />
                  </div>
                </div>

                <div className="rs-field rs-note">
                  <label className="rs-check" htmlFor="rs-agree">
                    <input
                      id="rs-agree"
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => {
                        setAgree(e.target.checked);
                        setError("");
                      }}
                    />
                    <span>
                      I have read and agree to the review guidelines. Public
                      reviews should not contain personal information, malicious
                      comments, or unrelated content.
                    </span>
                  </label>
                </div>

                <div className="rs-actions">
                  <div className="rs-micro">
                    {error ? <span className="rs-error">{error}</span> : null}
                  </div>
                  <button
                    type="submit"
                    className="rs-btn rs-btn-primary"
                    disabled={sending}
                  >
                    {sending ? "Sending…" : "Submit My Review →"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </div>

      <section className="rs-quote">
        <div style={{ font: '70px Georgia, serif', color: "var(--rs-sky)" }}>
          “
        </div>
        <p>
          Moments of pause. Personalized care. A little more time to reconnect
          with yourself.
        </p>
        <small>
          Luna Spa · Massage &amp; wellness experiences in Sayulita
        </small>
      </section>
    </div>
  );
}
