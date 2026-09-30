import { LINKS } from "../lib/site";

export default function RoyalCta({ title, text }) {
  return (
    <section className="section royal-band">
      <div className="container">
        <div className="cta-box">
          <div>
            <div className="kicker" style={{ color: "#8ce5f2" }}>
              Ready to book?
            </div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <a
            className="btn btn-gold"
            href={LINKS.bookMassage}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}