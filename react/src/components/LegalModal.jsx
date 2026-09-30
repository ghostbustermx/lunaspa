import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function LegalModal({ title, eyebrow, intro, sections, onClose }) {
  const titleId = `legal-modal-title-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;

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

  return createPortal(
    <div
      className="privacy-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div className="privacy-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="privacy-modal-close"
          onClick={onClose}
          aria-label={`Close ${title}`}
        >
          <span aria-hidden="true">✕</span>
        </button>
        <div className="privacy-modal-head">
          <span className="privacy-modal-eyebrow">{eyebrow}</span>
          <h3 id={titleId}>{title}</h3>
          <p>{intro}</p>
        </div>
        <div className="privacy-modal-body">
          {sections.map((s, i) => (
            <div key={i}>
              <h4>{s.heading}</h4>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}