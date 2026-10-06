import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";
import HeroPhoto from "../components/HeroPhoto";
import QuickBook from "../components/HeroParts";
import RatingStrip from "../components/RatingStrip";
import SectionHead from "../components/SectionHead";
import ServiceCard from "../components/ServiceCard";
import Steps from "../components/Steps";
import FAQ from "../components/Faq";
import RoyalCta from "../components/RoyalCta";
import InternalLinks from "../components/InternalLinks";
import { PhotoStrip } from "../components/Photos";
import { SEO, LINKS, TREATMENTS, FAQS_INHOME } from "../lib/site";
import { IMG } from "../lib/images";

export default function InHome() {
  const seo = SEO.inhome;

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
          <Breadcrumb page="Moonlight Couples Ritual" />
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Signature ritual · Sayulita</span>
              <h1>Moonlight Couples Ritual in Sayulita — 90 Minutes for Two</h1>
              <p className="lead">
                A deep relaxation experience to share. Includes an integrative
                body massage, hot stone therapy to dissolve muscle tension, and
                a nourishing facial mask that restores freshness and luminosity
                to the skin. The perfect ritual to connect, rest and renew
                energies together.
              </p>
              <RatingStrip />
              <span className="price-pill">✦ $3,200 MXN · 90 min</span>
              <p className="micro">
                Option 90 min: Massage + Face Mask + Hot Stones — $3,200 MXN
              </p>
            </div>
            <div className="hero-card">
              <HeroPhoto
                src={`${import.meta.env.BASE_URL}assets/luna_spa_3.webp`}
                alt="Luna Spa in-home massage beside a private pool surrounded by tropical greenery"
              />
              <QuickBook href={LINKS.bookMoonlight} />
            </div>
          </div>
        </div>
      </section>

      <section
        className="section visual-story reverse"
        aria-labelledby="private-title"
      >
        <div className="container">
          <div className="story-grid">
            <div className="story-image">
              <img
                src={`${import.meta.env.BASE_URL}assets/luna_spa_4.webp`}
                alt="Luna Spa massage at a tropical accommodation in Sayulita"
                loading="lazy"
                width="320"
                height="320"
              />
            </div>
            <div className="story-copy">
              <span className="image-kicker">Your place. Your pace.</span>
              <h2 id="private-title">
                Turn your Airbnb, villa or hotel into your private spa.
              </h2>
              <p>
                You do not need to organize transportation or lose time
                traveling across town. Luna Spa brings the treatment, setup and
                calm directly to your accommodation.
              </p>
              <ul className="story-points">
                <li>
                  Tell us where you are staying and the treatment you want.
                </li>
                <li>
                  We coordinate the appointment and arrival details with you.
                </li>
                <li>
                  You can return to your vacation immediately after the
                  massage.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section luna-inhome">
        <div className="container">
          <SectionHead
            kicker="Your Airbnb · Villa · Hotel"
            title="Professional massage at your accommodation."
            text="Luna Spa specializes in bringing massage treatments directly to your space in Sayulita."
          />
          <div className="grid-3">
            <div className="card">
              <h3>Massage at Your Airbnb</h3>
              <p>
                Enjoy a professional treatment without arranging transportation
                or leaving your vacation rental.
              </p>
            </div>
            <div className="card">
              <h3>Massage at Your Villa</h3>
              <p>
                Turn your private villa into a comfortable wellness space for
                couples, families or groups.
              </p>
            </div>
            <div className="card">
              <h3>Massage at Your Hotel</h3>
              <p>
                Ask us to confirm availability for your hotel or resort
                location in Sayulita.
              </p>
            </div>
          </div>
        </div>
        </section>

      <section className="section-sm soft" aria-labelledby="spaces-title">
        <div className="container">
          <SectionHead
            kicker="Designed around your stay"
            id="spaces-title"
            title="A spa experience without leaving home base."
          />
          <PhotoStrip
            photos={[
              {
                src: IMG.home1,
                alt: "Luna Spa massage tables prepared in an ocean-view palapa",
                width: 478,
                height: 602,
                caption: "Ocean-view villa experience"
              },
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_5.webp`,
                alt: "Luna Spa therapist providing an in-home massage",
                width: 320,
                height: 320,
                caption: "Professional in-home setup"
              },
              {
                src: IMG.therapeutic,
                alt: "Two prepared massage tables under a thatched roof",
                width: 320,
                height: 320,
                caption: "Private appointments"
              }
            ]}
          />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead
            kicker="The experience"
            title="A private spa experience without leaving your accommodation."
            text="Your vacation time is valuable. In-home service removes the extra trip and lets you keep relaxing after your treatment."
          />
          <div className="grid-3">
            <div className="card">
              <h3>No Driving</h3>
              <p>No extra transportation or travel time to reach a spa.</p>
            </div>
            <div className="card">
              <h3>We Come to You</h3>
              <p>
                Your appointment is coordinated around your accommodation and
                availability.
              </p>
            </div>
            <div className="card">
              <h3>Stay in Your Space</h3>
              <p>
                After your massage, you can simply continue enjoying your
                vacation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section luna-inhome-pricing" id="pricing">
        <div className="container">
          <SectionHead
            kicker="In-home massage prices"
            title="Choose your treatment."
            text="Current menu pricing, with duration and booking CTA kept visible."
          />
          <div className="grid-3">
            {TREATMENTS.map((t) => (
              <ServiceCard key={t.id} treatment={t} />
            ))}
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
            kicker="Before your appointment"
            title="Simple preparation for a better experience."
          />
          <div className="grid-2">
            <div className="card">
              <ul className="check-list">
                <li>Eat lightly before your appointment.</li>
                <li>Avoid alcoholic beverages before the service.</li>
                <li>
                  Remove earrings, bracelets, rings, necklaces, watches and
                  other accessories.
                </li>
              </ul>
            </div>
            <div className="card">
              <ul className="check-list">
                <li>
                  Tell us about relevant health conditions before your
                  appointment.
                </li>
                <li>
                  Sunburn may prevent you from receiving or enjoying your
                  treatment.
                </li>
                <li>
                  For pregnancy, Luna Spa's current menu requires at least
                  three months along and a healthy pregnancy.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <SectionHead kicker="Before you book" title="Frequently asked questions." />
          <FAQ items={FAQS_INHOME} />
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