import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";
import QuickBook from "../components/HeroParts";
import RatingStrip from "../components/RatingStrip";
import SectionHead from "../components/SectionHead";
import ServiceCard from "../components/ServiceCard";
import Steps from "../components/Steps";
import FAQ from "../components/Faq";
import PriceTable from "../components/PriceTable";
import RoyalCta from "../components/RoyalCta";
import InternalLinks from "../components/InternalLinks";
import HeroCarousel from "../components/HeroCarousel";
import AnchorLink from "../components/AnchorLink";
import { PhotoMosaic } from "../components/Photos";
import { SEO, LINKS, TREATMENTS, PRICE_ROWS_90, PRICES_FAQ_HOME } from "../lib/site";
import { IMG } from "../lib/images";

const GUIDE_CARDS = [
  {
    id: "wellness",
    tag: "01 · WELLNESS",
    title: "Relax after traveling",
    text: "Informational intent → recovery and relaxation."
  },
  {
    id: "sayulita",
    tag: "02 · SAYULITA",
    title: "Wellness day",
    text: "Local discovery → experiences during a stay."
  },
  {
    id: "massage",
    tag: "03 · MASSAGE",
    title: "Choose your treatment",
    text: "Consideration → treatment selection."
  }
];

export default function Home() {
  const seo = SEO.home;

  const stickerSrc = `${import.meta.env.BASE_URL}assets/sticker_azul.webp`;

  return (
    <>
      <Seo title={seo.title} description={seo.description} jsonLd={seo.jsonLd} />

      <section className="hero">
        <HeroCarousel />
        <div className="container">
          <a
            className="hero-sticker-link"
            href="https://sayulitatravel.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Sayulita Travel"
          >
            <img
              className="hero-sticker"
              src={stickerSrc}
              alt=""
              aria-hidden="true"
              width="76"
              height="39"
              loading="lazy"
            />
          </a>
          <Breadcrumb page="Massage in Sayulita" />
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Massage in Sayulita · We Come to You</span>
              <h1>
                Professional Massage in Sayulita, Mexico — Brought to You
              </h1>
              <p className="lead">
                A private massage experience in the comfort of your Airbnb,
                villa or hotel. Choose your treatment, tell us where you're
                staying, and make time to relax.
              </p>
              <RatingStrip />
              <span className="price-pill">✦ From $950 MXN · 60 min</span>
              <div className="hero-proof">
                <span className="proof-chip">In-home service</span>
                <span className="proof-chip">Clear pricing</span>
                <span className="proof-chip">WhatsApp booking</span>
              </div>
              <QuickBook />
            </div>
          </div>
          </div>
      </section>

      <section
        className="section visual-story"
        aria-labelledby="experience-title"
      >
        <div className="container">
          <div className="story-grid">
            <div className="story-copy">
              <span className="image-kicker">The Luna Spa experience</span>
              <h2 id="experience-title">
                A massage that feels like part of your Sayulita vacation.
              </h2>
              <p>
                From a quiet villa to a tropical terrace, Luna Spa brings the
                treatment to the place where you are already relaxing.
              </p>
              <ul className="story-points">
                <li>Private, in-home appointments in Sayulita.</li>
                <li>
                  Professional setup designed around your accommodation.
                </li>
                <li>
                  Clear treatment options, duration and pricing before you
                  book.
                </li>
              </ul>
            </div>
            <div className="story-image">
              <img
                src={IMG.poolside}
                alt="Massage treatment in a lush private poolside setting in Sayulita"
                loading="lazy"
                width="320"
                height="320"
              />
            </div>
          </div>
          </div>
      </section>

      <section className="section-sm" id="treatments">
        <div className="container">
          <SectionHead
            kicker="Massage menu"
            title="Choose the massage that fits you."
            text="Clear treatment options, visible prices and a direct path to booking."
          />
          <div className="grid-3">
            {TREATMENTS.map((t) => (
              <ServiceCard key={t.id} treatment={t} />
            ))}
          </div>
          </div>
        </section>

      <section
        className="section-sm soft"
        aria-labelledby="moments-title"
      >
        <div className="container">
          <SectionHead
            kicker="A few real moments"
            id="moments-title"
            title="Spaces made for slowing down."
            text="Real Luna Spa settings, from ocean-view palapas to tropical accommodations."
          />
          <PhotoMosaic
            photos={[
              {
                src: IMG.therapeutic,
                alt: "Two massage tables prepared under a palapa at Luna Spa",
                width: 320,
                height: 320,
                caption: "Private spa setting"
              },
              {
                src: IMG.deepTissue,
                alt: "Massage treatment with ocean view at Luna Spa",
                width: 320,
                height: 320,
                caption: "Ocean-view relaxation"
              },
              {
                src: IMG.home2,
                alt: "Massage treatment surrounded by tropical greenery",
                width: 320,
                height: 320,
                caption: "Tropical in-home service"
              }
            ]}
          />
          </div>
      </section>

      <section className="section soft why-luna">
        <div className="container">
          <SectionHead
            kicker="Why Luna Spa"
            title="A spa experience that fits your vacation."
            text="The service model is built around convenience: choose your treatment and enjoy it where you're already staying."
          />
          <div className="grid-3">
            <div className="card">
              <h3>We Come to You</h3>
              <p>
                Enjoy your treatment at your Airbnb, villa, hotel or vacation
                rental in Sayulita.
              </p>
            </div>
            <div className="card">
              <h3>Clear Treatment Menu</h3>
              <p>
                See the treatment, duration and current price before contacting
                Luna Spa.
              </p>
            </div>
            <div className="card">
              <h3>Direct Booking</h3>
              <p>
                Use WhatsApp to ask about availability and coordinate the
                appointment.
              </p>
            </div>
          </div>
          </div>
        </section>

      <section className="section soft" id="pricing">
        <div className="container">
          <SectionHead
            kicker="Massage prices in Sayulita"
            title="Simple, visible pricing."
            text="Current menu pricing is shown below. Group and multi-treatment arrangements are confirmed based on availability."
          />
          <PriceTable rows={PRICE_ROWS_90} />
          <div className="inline-cta">
            <div>
              <strong>Already know what you want?</strong>
              <div className="note">
                Skip the menu and check availability directly.
              </div>
            </div>
            <a
              className="btn btn-primary"
              href={LINKS.checkAvailability}
              target="_blank"
              rel="noopener noreferrer"
            >
              Check Availability
            </a>
          </div>
          </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            kicker="Simple booking"
            title="From Google search to massage in four steps."
            text="No complicated booking flow: choose, tell us where you're staying, confirm availability, and relax."
          />
          <Steps />
          </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead
            kicker="THE SAYULITA WELLNESS GUIDE"
            title="Wellness, local inspiration & ways to slow down in Sayulita."
            text="Discover thoughtful guides, wellness rituals and local inspiration designed to help you feel your best before, during and after your time in Sayulita."
          />
          <div className="grid-3">
            {GUIDE_CARDS.map((node) => (
              <div className="card" key={node.id}>
                <span className="kicker">{node.tag}</span>
                <h3>{node.title}</h3>
                <p>{node.text}</p>
                <div className="internal-links">
                  <AnchorLink to="/wellness-guide">Read →</AnchorLink>
                </div>
              </div>
            ))}
          </div>
          </div>
      </section>

      <section className="section faq-luna" id="faq">
        <div className="container">
          <SectionHead kicker="Before you book" title="Frequently asked questions." />
          <FAQ items={PRICES_FAQ_HOME} />
          </div>
        </section>

      <RoyalCta
        title="Ready to relax in Sayulita?"
        text="Choose your treatment and let Luna Spa bring the experience to you."
      />

      <section className="section-sm soft">
        <div className="container">
          <SectionHead
            kicker="Explore Luna Spa"
            title="Looking for a different massage?"
            text="Move directly to the service page that matches your search."
          />
          <InternalLinks
            links={[
              { to: "/moonlight-couples-ritual", label: "Moonlight Couples Ritual" },
              { to: "/sayulita-reset", label: "Sayulita Reset" },
              { to: "/after-surfing", label: "After Surfing" },
              { to: "/luminous-skin", label: "Luminous Skin" }
            ]}
          />
          </div>
      </section>
    </>
  );
}