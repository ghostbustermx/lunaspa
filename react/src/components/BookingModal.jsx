import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { submitBooking } from "../lib/api";

const EMPTY = {
  name: "",
  email: "",
  whatsapp: "",
  location: "",
  preferred_date: "",
  notes: "",
  website: ""
};

function Field({ id, label, error, full, children }) {
  return (
    <div className={`bm-field${full ? " full" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span className="bm-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export default function BookingModal({ treatment, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [failure, setFailure] = useState("");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Tras el exito se muestra la confirmacion3 segundos y el modal se
  // cierra solo (el usuario tambien puede cerrarlo antes con el boton o Esc).
  useEffect(() => {
    if (status !== "sent") return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [status, onClose]);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setFailure("");

    try {
      await submitBooking({
        ...form,
        treatment: `${treatment.name} · ${treatment.duration} · ${treatment.price}`,
        page: window.location.href
      });
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      if (err.fields) setErrors(err.fields);
      setFailure(err.message);
    }
  }

  const titleId = "booking-modal-title";

  return createPortal(
    <div
      className="privacy-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="privacy-modal-card booking-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="privacy-modal-close"
          onClick={onClose}
          aria-label="Close booking form"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className="privacy-modal-head">
          <span className="privacy-modal-eyebrow">Luna Spa · Sayulita</span>
          <h3 id={titleId}>Book your massage</h3>
          <p>Tell us the basics and we'll confirm availability with you.</p>
        </div>

        <div className="privacy-modal-body bm-body">
          <div className="bm-treatment">
            <span>{treatment.name}</span>
            <strong>
              {treatment.duration} · {treatment.price}
            </strong>
          </div>

          {status === "sent" ? (
            <div className="bm-success" role="status">
              <span className="bm-success-icon" aria-hidden="true">
                ✓
              </span>
              <p>
                Your request has been sent. We'll confirm availability shortly
                by email or WhatsApp.
              </p>
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Close
              </button>
            </div>
          ) : (
            <form className="bm-form" onSubmit={onSubmit} noValidate>
              {failure && (
                <div className="bm-failure" role="alert">
                  {failure}
                </div>
              )}

              <div className="bm-grid">
                <Field id="bm-name" label="Full name" error={errors.name}>
                  <input
                    id="bm-name"
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    autoComplete="name"
                    maxLength={60}
                    required
                    autoFocus
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "bm-name-error" : undefined}
                  />
                </Field>

                <Field id="bm-email" label="Email" error={errors.email}>
                  <input
                    id="bm-email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    autoComplete="email"
                    maxLength={190}
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "bm-email-error" : undefined}
                  />
                </Field>

                <Field
                  id="bm-whatsapp"
                  label="WhatsApp number"
                  error={errors.whatsapp}
                >
                  <input
                    id="bm-whatsapp"
                    type="tel"
                    value={form.whatsapp}
                    onChange={set("whatsapp")}
                    autoComplete="tel"
                    placeholder="+52 322 000 0000"
                    maxLength={30}
                    required
                    aria-invalid={Boolean(errors.whatsapp)}
                    aria-describedby={
                      errors.whatsapp ? "bm-whatsapp-error" : undefined
                    }
                  />
                </Field>

                <Field
                  id="bm-location"
                  label="Where are you staying?"
                  error={errors.location}
                >
                  <input
                    id="bm-location"
                    type="text"
                    value={form.location}
                    onChange={set("location")}
                    placeholder="Airbnb, villa or hotel in Sayulita"
                    maxLength={120}
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={
                      errors.location ? "bm-location-error" : undefined
                    }
                  />
                </Field>

                <Field
                  id="bm-date"
                  label="Preferred date"
                  error={errors.preferred_date}
                >
                  <input
                    id="bm-date"
                    type="date"
                    value={form.preferred_date}
                    onChange={set("preferred_date")}
                    aria-invalid={Boolean(errors.preferred_date)}
                    aria-describedby={
                      errors.preferred_date ? "bm-date-error" : undefined
                    }
                  />
                </Field>

                <Field
                  id="bm-notes"
                  label="Anything we should know?"
                  error={errors.notes}
                  full
                >
                  <textarea
                    id="bm-notes"
                    value={form.notes}
                    onChange={set("notes")}
                    rows={3}
                    maxLength={600}
                    aria-invalid={Boolean(errors.notes)}
                    aria-describedby={errors.notes ? "bm-notes-error" : undefined}
                  />
                </Field>
              </div>

              {/* Trampantojo contra bots: invisible para el usuario, los
                  bots de relleno automatico lo completan. */}
              <div className="bm-hp" aria-hidden="true">
                <label htmlFor="bm-website">Leave this field empty</label>
                <input
                  id="bm-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={set("website")}
                />
              </div>

              <div className="bm-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send booking request"}
                </button>
                <span className="bm-note">
                  We'll only use your details to confirm this booking — no
                  spam, no lists.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
