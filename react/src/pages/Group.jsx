import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";
import HeroPhoto from "../components/HeroPhoto";
import QuickBook from "../components/HeroParts";
import RatingStrip from "../components/RatingStrip";
import SectionHead from "../components/SectionHead";
import FAQ from "../components/Faq";
import PriceTable from "../components/PriceTable";
import RoyalCta from "../components/RoyalCta";
import InternalLinks from "../components/InternalLinks";
import { PhotoMosaic } from "../components/Photos";
import { SEO, LINKS, PRICE_ROWS, FAQS_GROUP } from "../lib/site";

export default function Group() {
  const seo = SEO.group;

  const stickerSrc = `${import.meta.env.BASE_URL}assets/sticker_azul.webp`;

  return (
    <>
      <Seo title={seo.title} description={seo.description} jsonLd={seo.jsonLd} />

      <section className="hero">
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
          <Breadcrumb page="Luminous Skin" />
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Skin renewal ritual · Sayulita</span>
              <h1>Luminous Skin — 90-Minute Full-Body Exfoliation + Massage</h1>
              <p className="lead">
                Renewing treatment designed to restore softness and glow to the
                skin while relieving muscle tension.
              </p>
              <RatingStrip />
              <span className="price-pill">✦ $1,650 MXN · 90 min</span>
              <p className="micro">
                Full-body exfoliation &amp; hydration + massage (90 min) —
                $1,650 MXN
              </p>
            </div>
            <div className="hero-card">
              <HeroPhoto
                src={`${import.meta.env.BASE_URL}assets/Body-Scrubs-1.webp`}
                alt="Full-body exfoliation scrub treatment at Luna Spa in Sayulita"
              />
              <QuickBook href={LINKS.bookLuminous} />
            </div>
          </div>
        </div>
      </section>

      <section
        className="section visual-story"
        aria-labelledby="group-experience-title"
      >
        <div className="container">
          <div className="story-grid">
            <div className="story-copy">
              <span className="image-kicker">Wellness for the whole group</span>
              <h2 id="group-experience-title">
                Turn your villa into a private spa for the day.
              </h2>
              <p>
                Group massage works especially well for girls trips, family
                vacations, retreats and celebrations where everyone wants a
                little time to unwind.
              </p>
              <ul className="story-points">
                <li>Send us your group size, date and accommodation.</li>
                <li>
                  Guests can request different treatments when availability
                  allows.
                </li>
                <li>We confirm the practical details before you book.</li>
              </ul>
            </div>
            <div className="story-image">
              <img
                src={`${import.meta.env.BASE_URL}assets/luna_spa_14.webp`}
                alt="Multiple massage tables prepared in an ocean-view palapa"
                loading="lazy"
                width="478"
                height="602"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            kicker="Girls trips · retreats · vacations"
            title="Bring a private spa experience to your villa."
            text="A group massage is especially convenient when your vacation is based around a private villa or large Airbnb."
          />
          <div className="grid-2">
            <div className="card">
              <h3>Girls Trips</h3>
              <p>
                Add a relaxing wellness experience without interrupting the
                rest of your plans.
              </p>
            </div>
            <div className="card">
              <h3>{"Friends & Family"}</h3>
              <p>
                Different people can choose different treatments based on their
                preferences.
              </p>
            </div>
            <div className="card">
              <h3>Retreats</h3>
              <p>
                Create space for relaxation during a retreat or
                wellness-focused gathering.
              </p>
            </div>
            <div className="card">
              <h3>{"Weddings & Special Events"}</h3>
              <p>
                Massage can be part of the experience around a wedding,
                birthday or other special occasion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm soft" aria-labelledby="group-gallery-title">
        <div className="container">
          <SectionHead
            kicker="Built around your occasion"
            id="group-gallery-title"
            title="From villa days to tropical retreats."
          />
          <PhotoMosaic
            photos={[
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_15.webp`,
                alt: "Massage experience beside a tropical pool",
                width: 320,
                height: 320,
                caption: "Villa wellness day"
              },
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_16.webp`,
                alt: "Two massage tables prepared under a thatched roof",
                width: 320,
                height: 320,
                caption: "Multiple appointments"
              },
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_17.webp`,
                alt: "Massage treatment overlooking tropical greenery and the ocean",
                width: 320,
                height: 320,
                caption: "Tropical setting"
              }
            ]}
          />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead
            kicker="Plan your group"
            title="Tell us the details and we'll coordinate from there."
            text="When you contact Luna Spa, send the number of people, where you're staying, preferred date, preferred time and treatments you're interested in."
          />
          <ul className="check-list">
            <li>Number of people</li>
            <li>Airbnb, villa or hotel location</li>
            <li>Preferred date and time</li>
            <li>Preferred treatments</li>
          </ul>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="container">
          <SectionHead
            kicker="Group massage prices"
            title="Current individual treatment rates."
            text="The current menu does not publish a separate group rate or group package. Group pricing and availability are confirmed based on the requested arrangement."
          />
          <PriceTable rows={PRICE_ROWS} />
          <div className="card" style={{ marginTop: 20 }}>
            <h3>Need multiple therapists?</h3>
            <p>
              For larger groups, tell us your group size and preferred schedule
              so Luna Spa can confirm what is possible.
            </p>
            <a
              className="btn btn-primary"
              href={LINKS.planGroup}
              target="_blank"
              rel="noopener noreferrer"
            >
              Plan My Group
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <SectionHead kicker="Before you book" title="Frequently asked questions." />
          <FAQ items={FAQS_GROUP} />
        </div>
      </section>

      <RoyalCta
        title="Ready to make time for yourself?"
        text="Choose your treatment, send your location and check availability on WhatsApp."
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
              { to: "/", label: "Massage in Sayulita" },
              { to: "/moonlight-couples-ritual", label: "Moonlight Couples Ritual" },
              { to: "/sayulita-reset", label: "Sayulita Reset" },
              { to: "/after-surfing", label: "After Surfing" }
            ]}
          />
        </div>
      </section>
    </>
  );
}