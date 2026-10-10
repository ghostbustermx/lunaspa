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
  },
  {
    title: "SPORTS MASSAGE",
    text: "A firm, deep-pressure therapeutic treatment designed to release muscle tension built up from training or intense physical activity. Helps deactivate trigger points (knots), reduce muscle fatigue, improve flexibility and accelerate the body's natural recovery process. Ideal for preventing injuries and maintaining optimal physical performance. Recommended for: athletes, people preparing for competitions, or anyone experiencing severe muscle fatigue from physical activity."
  }
];

const FACIALS = [
  {
    title: "DEEP CLEANSE FACIAL",
    text: "Purity and freshness in a single ritual: purifying treatment designed to unclog pores, remove blackheads, dead cells and accumulated impurities. Fully customized to your skin type."
  },
  {
    title: "REVITALIZING FACIAL",
    text: "Intensive brightening therapy designed to restore vitality, luminosity and firmness to dull, fatigued or stressed skin. Through the application of vitamin, antioxidant and nourishing active concentrates, it regenerates skin texture and deeply hydrates, achieving an instantly radiant, rested look."
  },
  {
    title: "OXYGENATING FACIAL",
    text: "Detoxifying treatment that stimulates cellular respiration and skin microcirculation. Ideal for asphyxiated skin exposed to pollution, sun or environmental stress. Helps eliminate toxins, oxygenate tissues and restore the skin's natural balance, leaving it visibly brighter, fresher and full of energy."
  },
  {
    title: "HYDRATING FACIAL",
    text: "Deep hydration, radiant skin: restores the skin's optimal moisture level and relieves the feeling of tightness, leaving it fresh, silky and radiant."
  },
  {
    title: "CALMING FACIAL FOR SENSITIVE SKIN",
    text: "Decongesting and hydrating treatment especially formulated for sensitive, reactive or rosacea-prone skin, and skin irritated by sun and wind exposure. Uses soothing botanical actives, cold masks and gentle massage techniques that reduce redness, relieve burning and restore the skin's natural barrier. Returns comfort, freshness and softness to sensitive skin."
  },
  {
    title: "LUNA FACIAL",
    text: "Adapted strictly to your needs. This personalized experience combines a specific cleansing, exfoliation and a customized mask with a relaxing massage of the face, neck and scalp, leaving the skin radiant and balanced."
  }
];

const BODY_TREATMENTS = [
  {
    title: "BRIDAL BODY WRAP",
    text: "Exfoliation, body wrap, and hydration treatment that leaves the skin soft, luminous and silky, ideal before special events."
  }
];

const RITUALS = [
  {
    title: "MOONLIGHT COUPLES RITUAL",
    text: "Massage + face mask + hot stones: Moonlight Couples Ritual (90 min). A deep relaxation experience to share. Includes an integrative body massage, hot stone therapy to dissolve muscle tension, and a nourishing facial mask that restores freshness and luminosity to the skin. The perfect ritual to connect, rest and renew energies together."
  },
  {
    title: "SAYULITA RESET",
    text: "90 minutes: 50 min massage of your choice between relaxing, therapeutic and deep tissue + 40 min hydrating facial. Reset your body and refresh your skin after a day at the beach. The ultimate treatment to reset your body and refresh your skin after a day under the Sayulita sun. Combines 50 minutes of customized body massage (chosen according to your body's needs) with a 40-minute highly hydrating express facial. Restores skin elasticity, relieves physical fatigue and returns the comfort lost to heat, salt and wind."
  },
  {
    title: "AFTER SURFING",
    text: "90 min: 50 minutes of sports massage + 40 min soothing facial. After surfing & after an adventure day (90 min). Intensive recovery therapy specifically designed to release muscle overload and repair skin exposed to the elements. Includes 50 minutes of deep tissue massage focused on releasing the back, shoulders and legs, followed by a 40-minute facial with concentrated aloe vera that calms, decongests and regenerates skin affected by sun and salt. Perfect for: after surfing, after a hike, after trekking, after intense physical activity."
  },
  {
    title: "LUMINOUS SKIN PACKAGE",
    text: "Full-body exfoliation and hydration + massage: renewing treatment designed to restore softness and glow to the skin while relieving muscle tension."
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
              title="Rituals & Packages"
              open={openGroup === "rituals"}
              onToggle={() =>
                setOpenGroup(openGroup === "rituals" ? null : "rituals")
              }
            >
              {RITUALS.map((it) => (
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