import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Item({ title, text }) {
  return (
    <div className="services-item">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function AccordionItem({ title, open, onToggle, children }) {
  return (
    <div className={`acc-item${open ? " open" : ""}`}>
      <button
        type="button"
        className="acc-btn"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="acc-title">{title}</span>
        <span className="acc-icon" aria-hidden="true"></span>
      </button>
      <div className="acc-panel">
        <div className="acc-panel-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

const MASSAGES = [
  {
    title: "RELAXING MASSAGE",
    text: "A gentle technique that relieves stress, reduces muscle tension, and promotes a deep state of calm and well-being."
  },
  {
    title: "DEEP TISSUE MASSAGE",
    text: "Works on deeper muscle layers to relieve chronic tension, stiffness, and persistent discomfort."
  },
  {
    title: "TIRED LEGS MASSAGE",
    text: "Localized treatment that activates circulation, relieves heaviness and provides immediate relief for legs and feet."
  }
];

const FACIALS = [
  {
    title: "MOISTURIZING FACIAL",
    text: "Cleansing and hydration treatment that nourishes and revitalizes the skin, leaving it smooth and radiant."
  },
  {
    title: "LUNA FACIAL",
    text: "An exclusive facial that combines cleansing, exfoliation, and a personalized mask with a relaxing massage of the face, neck, and scalp, leaving the skin radiant and balanced."
  },
  {
    title: "FACIAL LYMPHATIC DRAINAGE",
    text: "Gentle massage that reduces fluid retention, decreases puffiness, and enhances skin appearance, leaving it fresher and more radiant."
  },
  {
    title: "THERAPEUTIC MASSAGE",
    text: "Focused on specific areas of pain or muscle tightness, it helps release tension and improve mobility."
  },
  {
    title: "HOT STONE MASSAGE",
    text: "Combines the use of warm stones and massage to relax muscles, improve circulation, and provide a deep sense of well-being."
  },
  {
    title: "LUNA MASSAGE",
    text: "A unique combination of therapeutic, deep tissue, and hot stones techniques, using oils with analgesic and anti-inflammatory properties such as arnica, rosemary, calendula, cinnamon, turmeric and black cumin."
  }
];

const BODY_TREATMENTS = [
  {
    title: "BRIDAL BODY WRAP",
    text: "Exfoliation, body wrap, and hydration treatment that leaves the skin soft, luminous and silky, ideal before special events."
  },
  {
    title: "MANUAL LYMPHATIC DRAINAGE",
    text: "A gentle technique that stimulates lymphatic circulation, promotes the elimination of fluids and toxins, and improves the feeling of lightness."
  }
];

export default function ServicesDescriptionModal({ onClose }) {
  const [openGroup, setOpenGroup] = useState("massages");
  const [openCancel, setOpenCancel] = useState("in-advance");

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
      aria-labelledby="services-desc-title"
      onClick={onClose}
    >
      <div className="privacy-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="privacy-modal-close"
          onClick={onClose}
          aria-label="Close services description"
        >
          <span aria-hidden="true">✕</span>
        </button>
        <div className="privacy-modal-head">
          <span className="privacy-modal-eyebrow">Luna Spa · Sayulita</span>
          <h3 id="services-desc-title">Description of Services</h3>
        </div>
        <div className="privacy-modal-body services-desc-body">
          <div className="acc">
            <AccordionItem
              title="Massages"
              open={openGroup === "massages"}
              onToggle={() =>
                setOpenGroup(openGroup === "massages" ? null : "massages")
              }
            >
              {MASSAGES.map((it) => (
                <Item key={it.title} {...it} />
              ))}
            </AccordionItem>

            <AccordionItem
              title="Facials"
              open={openGroup === "facials"}
              onToggle={() =>
                setOpenGroup(openGroup === "facials" ? null : "facials")
              }
            >
              {FACIALS.map((it) => (
                <Item key={it.title} {...it} />
              ))}
            </AccordionItem>

            <AccordionItem
              title="Body Treatments"
              open={openGroup === "body"}
              onToggle={() =>
                setOpenGroup(openGroup === "body" ? null : "body")
              }
            >
              {BODY_TREATMENTS.map((it) => (
                <Item key={it.title} {...it} />
              ))}
            </AccordionItem>

            <AccordionItem
              title="Pre-service considerations"
              open={openGroup === "pre"}
              onToggle={() =>
                setOpenGroup(openGroup === "pre" ? null : "pre")
              }
            >
              <ul className="services-desc-list">
                <li>
                  Eat lightly before the service and avoid alcoholic beverages.
                </li>
                <li>
                  Avoid bringing earrings, bracelets, rings, necklaces, watches
                  or other accessories.
                </li>
                <li>
                  Sunburn may prevent you from receiving or enjoying your
                  treatment.
                </li>
                <li>
                  Pregnant clients must be at least 3 months along and have a
                  healthy pregnancy to receive a massage for the safety of both
                  mother and baby.
                </li>
                <li>
                  Clients with cancer should consult their doctor beforehand to
                  determine if massage is appropriate, in order to avoid
                  potential risks.
                </li>
                <li>
                  It is vitally important to avoid massage in cases of health
                  risks such as thrombosis, acute infections, or fever.
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem
              title="Cancellation Policy"
              open={openGroup === "cancel"}
              onToggle={() =>
                setOpenGroup(openGroup === "cancel" ? null : "cancel")
              }
            >
              <p className="cancel-intro">
                At Luna Spa, we value your time and that of our therapists. To
                provide a fair and professional service, please take the
                following policies into consideration when booking your
                appointment:
              </p>
              <div className="acc acc-nested">
                <AccordionItem
                  title="Cancellations in advance"
                  open={openCancel === "in-advance"}
                  onToggle={() =>
                    setOpenCancel(
                      openCancel === "in-advance" ? null : "in-advance"
                    )
                  }
                >
                  <Item
                    title="Cancellations in advance"
                    text="If you need to cancel or reschedule your appointment, you may do so up to 24 hours before your scheduled time with no penalty."
                  />
                </AccordionItem>
                <AccordionItem
                  title="Same-day cancellations"
                  open={openCancel === "same-day"}
                  onToggle={() =>
                    setOpenCancel(
                      openCancel === "same-day" ? null : "same-day"
                    )
                  }
                >
                  <Item
                    title="Same-day cancellations"
                    text="If you cancel on the same day of your appointment, a 50% fee of the service cost will be charged. This compensates for the therapist's reserved time and availability, ensuring a responsible and fair service for all our clients."
                  />
                </AccordionItem>
              </div>
              <p className="services-emoji">
                ✨ We appreciate your understanding. These policies ensure a
                professional and fair experience for our clients as well as for
                our massage therapists.
              </p>
            </AccordionItem>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}