import { useState } from "react";
import { Link } from "react-router-dom";
import AnchorLink from "./AnchorLink";
import FooterQr from "./FooterQr";
import LegalModal from "./LegalModal";
import { PRIVACY_SECTIONS, TERMS_SECTIONS } from "../lib/legal";
import { LINKS, PHONE_DISPLAY } from "../lib/site";
import { IMG } from "../lib/images";

export default function Footer() {
  const [modal, setModal] = useState(null);

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img
            className="footer-logo"
            src={IMG.logo}
            alt="Luna Spa logo"
            width="78"
            height="78"
          />
          <h3>Luna Spa in Sayulita</h3>
          <p>
            Professional massage and spa experiences brought to your Airbnb,
            villa or hotel.
          </p>
          <a
            className="btn btn-primary"
            href={LINKS.bookMassage}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Your Massage
          </a>
        </div>
        <div>
          <h3>Explore</h3>
          <p>
            <Link to="/">Massage in Sayulita</Link>
          </p>
          <p>
            <Link to="/moonlight-couples-ritual">Moonlight Couples Ritual</Link>
          </p>
          <p>
            <Link to="/sayulita-reset">Sayulita Reset</Link>
          </p>
          <p>
            <Link to="/after-surfing">After Surfing</Link>
          </p>
          <p>
            <Link to="/luminous-skin">Luminous Skin</Link>
          </p>
          <p>
            <Link to="/body-treatments-facials">Body Treatments & Facials</Link>
          </p>
        </div>
        <div>
          <h3>Book</h3>
          <p>
            <AnchorLink to="/#pricing">Massage Prices</AnchorLink>
          </p>
          <p>
            <AnchorLink to="/#faq">FAQs</AnchorLink>
          </p>
          <p>
            <a
              href={LINKS.checkAvailability}
              target="_blank"
              rel="noopener noreferrer"
            >
              Check Availability
            </a>
          </p>
          <p>
            <strong>{PHONE_DISPLAY}</strong>
          </p>
        </div>
        <FooterQr />
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Luna Spa · Sayulita, Mexico</span>
        <span>
          In-home massage · Professional treatments · Private experience
        </span>
        <span>
          Powered by{" "}
          <a
            href="https://sayulitatravel.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sayulita Travel.
          </a>
        </span>
        <span>
          <button
            type="button"
            className="footer-link-btn"
            onClick={() => setModal("privacy")}
          >
            Privacy Policy
          </button>
        </span>
        <span>
          <button
            type="button"
            className="footer-link-btn"
            onClick={() => setModal("terms")}
          >
            Terms and Conditions
          </button>
        </span>
      </div>
      {modal === "privacy" && (
        <LegalModal
          title="Privacy Policy"
          eyebrow="Luna Spa · Sayulita"
          intro="Luna Spa respects your privacy. This policy explains the information we collect and how we use it."
          sections={PRIVACY_SECTIONS}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "terms" && (
        <LegalModal
          title="Terms and Conditions"
          eyebrow="Luna Spa · Sayulita"
          intro="By using this website or booking a Luna Spa service, you agree to these Terms and Conditions."
          sections={TERMS_SECTIONS}
          onClose={() => setModal(null)}
        />
      )}
    </footer>
  );
}