import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LINKS } from "../lib/site";

const PRINCIPLES = [
  {
    title: "Warmth",
    text: "We treat every person with kindness, respect, and genuine attention."
  },
  {
    title: "Wellbeing",
    text: "Our goal is for every treatment to contribute to how you feel — physically and emotionally."
  },
  {
    title: "Professionalism",
    text: "We work with responsibility, preparation, hygiene, and respect for each client's needs."
  },
  {
    title: "Personalization",
    text: "No two bodies are the same. We adapt the experience to your preferences, comfort, and goals."
  },
  {
    title: "Trust",
    text: "From your first message to the end of your treatment, we want you to feel safe, heard, and well cared for."
  }
];

function AccordionItem({ title, kicker, open, onToggle, children }) {
  return (
    <div className={`acc-item${open ? " open" : ""}`}>
      <button
        type="button"
        className="acc-btn"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="acc-title">
          {kicker && <span className="acc-kicker">{kicker}</span>}
          {title}
        </span>
        <span className="acc-icon" aria-hidden="true"></span>
      </button>
      <div className="acc-panel">
        <div className="acc-panel-inner">{children}</div>
      </div>
    </div>
  );
}

export default function AboutModal({ onClose }) {
  const [openGroup, setOpenGroup] = useState(null);

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
      aria-labelledby="about-modal-title"
      onClick={onClose}
    >
      <div
        className="privacy-modal-card about-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="privacy-modal-close"
          onClick={onClose}
          aria-label="Close about Luna Spa"
        >
          <span aria-hidden="true">✕</span>
        </button>
        <div className="privacy-modal-head">
          <span className="privacy-modal-eyebrow">Luna Spa · Sayulita</span>
          <h3 id="about-modal-title">About Us</h3>
        </div>
        <div className="privacy-modal-body about-modal-body">
          <section className="about-hero">
            <div className="about-hero-media">
              <img
                className="about-hero-img"
                src={`${import.meta.env.BASE_URL}assets/luna_spa_home_massage_1.webp`}
                alt="Relaxing massage treatment at Luna Spa in Sayulita"
                width="478"
                height="602"
                loading="lazy"
              />
            </div>
            <div className="about-hero-copy">
              <span className="about-eyebrow">About Luna Spa</span>
              <h4>Wellness That Comes to You</h4>
              <p>
                At Luna Spa, we believe that taking care of yourself should
                feel natural, personal, and easy to enjoy.
              </p>
              <p>
                We are a mobile massage therapy service in Sayulita, bringing
                professional massage and body treatments directly to your home,
                villa, Airbnb, or hotel.
              </p>
              <p>
                Our purpose is simple: to create moments of pause and wellbeing
                that help you disconnect from the pace of everyday life,
                reconnect with your body, and fully enjoy your time in Sayulita.
              </p>
              <p>
                Whether you are recovering from a busy day, looking to release
                tension, celebrating a special occasion, or simply want to slow
                down and enjoy a moment for yourself, we bring the experience
                to wherever you feel most comfortable.
              </p>
            </div>
          </section>

          <div className="acc about-acc">
            <AccordionItem
              kicker="Founder story"
              title="Meet Nahomy, Founder of Luna Spa"
              open={openGroup === "founder"}
              onToggle={() =>
                setOpenGroup(openGroup === "founder" ? null : "founder")
              }
            >
              <p className="about-sub">
                A local connection to Sayulita. A passion for wellness.
              </p>
              <p>
                My name is Nahomy, and Luna Spa is a project that grew from my
                love for Sayulita and my passion for helping people feel
                better.
              </p>
              <p>
                I have lived in Sayulita since I was one year old, so this
                community has been part of my life for as long as I can
                remember.
              </p>
              <p>
                I have a college degree in the health field and six years of
                experience in massage therapy. During this time, I have
                continued learning about this wonderful profession and the
                different ways massage therapy can support people physically,
                emotionally, and energetically.
              </p>
              <p>What I love most about this work is the human connection.</p>
              <p>
                Every person arrives with a different body, a different story,
                and different needs. That is why I believe a massage should
                never feel like a one-size-fits-all experience.
              </p>
              <p>
                For me, one of the most rewarding moments is seeing a client
                leave feeling lighter, more relaxed, and genuinely happy after
                their treatment.
              </p>
              <p>That feeling is at the heart of Luna Spa.</p>
            </AccordionItem>

            <AccordionItem
              kicker="Brand philosophy"
              title="More Than a Massage"
              open={openGroup === "philosophy"}
              onToggle={() =>
                setOpenGroup(openGroup === "philosophy" ? null : "philosophy")
              }
            >
              <p className="about-sub">A moment to slow down and reconnect</p>
              <p>
                Luna Spa was created with the idea that wellness doesn't have
                to mean traveling somewhere, following a complicated routine,
                or waiting for the perfect moment.
              </p>
              <p>
                Sometimes, wellness simply means giving yourself permission to
                pause.
              </p>
              <p>
                Our mobile experience allows you to enjoy your treatment in
                the comfort of your own space — whether that's your vacation
                rental, villa, hotel, or home.
              </p>
              <p>
                We take care of bringing the massage experience to you, so you
                can spend less time traveling and more time relaxing.
              </p>
              <h5>Your comfort comes first</h5>
              <p>
                Every treatment is approached with attention to your individual
                needs and preferences.
              </p>
              <p>
                Before your massage, we want to understand what you're looking
                for. During the experience, we adapt our approach to help you
                feel comfortable and cared for.
              </p>
              <p>
                Because every body is different, and every massage should be
                personal.
              </p>
            </AccordionItem>

            <AccordionItem
              title="What We Believe"
              open={openGroup === "beliefs"}
              onToggle={() =>
                setOpenGroup(openGroup === "beliefs" ? null : "beliefs")
              }
            >
              <p className="about-sub">Wellness should feel personal.</p>
              <p>Our approach is built around five principles:</p>
              <div className="about-principles">
                {PRINCIPLES.map((p, i) => (
                  <div className="about-card" key={p.title}>
                    <span className="about-card-n">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <strong>{p.title}</strong>
                    <p>{p.text}</p>
                  </div>
                ))}
              </div>
            </AccordionItem>

            <AccordionItem
              kicker="Vision"
              title="Looking Ahead"
              open={openGroup === "vision"}
              onToggle={() =>
                setOpenGroup(openGroup === "vision" ? null : "vision")
              }
            >
              <p className="about-sub">
                Growing without losing what makes us Luna Spa
              </p>
              <p>
                Today, Luna Spa brings massage and wellness experiences
                directly to clients throughout Sayulita and its surrounding
                areas.
              </p>
              <p>
                Our vision is to become a trusted wellness experience in
                Sayulita, recognized for the quality of our treatments,
                personalized attention, and genuine warmth.
              </p>
              <p>
                As Luna Spa grows, we hope to eventually evolve from a mobile
                spa concept into a dedicated wellness space of our own.
              </p>
              <p>But one thing will remain the same:</p>
              <p className="vision-quote">
                We want wellness to feel accessible, personal, and genuinely
                human.
              </p>
              <p>
                Our goal is not only to serve visitors enjoying Sayulita, but
                also to welcome local clients and help make massage and
                self-care a valuable part of everyday wellbeing — not simply an
                occasional luxury.
              </p>
            </AccordionItem>
          </div>

          <section className="about-purpose">
            <span className="about-eyebrow">Our Purpose</span>
            <h4>Creating space to pause.</h4>
            <p>
              Life can move quickly — especially when you're traveling,
              working, or balancing everything happening around you.
            </p>
            <p>
              Luna Spa exists to create a little space between everything else.
            </p>
            <ul className="purpose-moments">
              <li>A moment to breathe.</li>
              <li>A moment to reconnect with your body.</li>
              <li>A moment to simply enjoy where you are.</li>
            </ul>
            <p>That is what we want every Luna Spa experience to give you.</p>
          </section>

          <section className="about-finalcta">
            <h4>Your Time in Sayulita Deserves a Moment for You</h4>
            <p>
              Whether you're staying in a villa overlooking the ocean, relaxing
              at your Airbnb, enjoying a hotel, or simply looking for a moment
              of calm during your stay, Luna Spa brings the experience to you.
            </p>
            <p className="about-finalcta-line">
              Take a pause. Reconnect with yourself. Let us take care of the
              rest.
            </p>
            <a
              className="btn btn-gold"
              href={LINKS.bookMassage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Massage on WhatsApp
            </a>
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
}