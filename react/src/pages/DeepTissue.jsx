import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";
import HeroPhoto from "../components/HeroPhoto";
import QuickBook from "../components/HeroParts";
import RatingStrip from "../components/RatingStrip";
import SectionHead from "../components/SectionHead";
import Steps from "../components/Steps";
import FAQ from "../components/Faq";
import RoyalCta from "../components/RoyalCta";
import InternalLinks from "../components/InternalLinks";
import { PhotoStrip } from "../components/Photos";
import { SEO, LINKS, FAQS_DEEP } from "../lib/site";
import { IMG } from "../lib/images";

export default function DeepTissue() {
  const seo = SEO.deep;

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
          <Breadcrumb page="Sayulita Reset" />
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Beach recovery ritual · Sayulita</span>
              <h1>Sayulita Reset — 90-Minute Massage + Hydrating Facial</h1>
              <p className="lead">
                Reset your body and refresh your skin after a day at the beach.
                The ultimate treatment to reset your body after a day under the
                Sayulita sun, combining 50 minutes of customized body massage
                (chosen to your body's needs) with a 40-minute highly hydrating
                express facial. Restores skin elasticity, relieves physical
                fatigue and returns the comfort lost to heat, salt and wind.
              </p>
              <RatingStrip />
              <span className="price-pill">✦ $1,600 MXN · 90 min</span>
              <p className="micro">
                90 minutes: 50 min massage of your choice — relaxing,
                therapeutic or deep tissue + 40 min hydrating facial — $1,600
                MXN
              </p>
            </div>
            <div className="hero-card">
              <HeroPhoto
                src={`${import.meta.env.BASE_URL}assets/luna_spa_6.webp`}
                alt="Deep tissue massage treatment at Luna Spa with a tropical ocean-view setting"
              />
              <QuickBook href={LINKS.bookReset} />
            </div>
          </div>
        </div>
      </section>

      <section className="section visual-story" aria-labelledby="bodywork-title">
        <div className="container">
          <div className="story-grid">
            <div className="story-copy">
              <span className="image-kicker">Focused bodywork</span>
              <h2 id="bodywork-title">
                A more focused massage for areas that need attention.
              </h2>
              <p>
                Deep Tissue is the page for guests who are looking for a more
                targeted treatment rather than a purely relaxing massage.
              </p>
              <ul className="story-points">
                <li>Tell us which areas feel tense or overworked.</li>
                <li>Choose the treatment length that fits your plans.</li>
                <li>Enjoy the session in your Airbnb, villa or hotel.</li>
              </ul>
            </div>
            <div className="story-image">
              <img
                src={`${import.meta.env.BASE_URL}assets/luna_spa_7.webp`}
                alt="Prepared massage tables in a tropical Luna Spa setting"
                loading="lazy"
                width="320"
                height="320"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section luna-deep">
        <div className="container">
          <SectionHead
            kicker="Focused bodywork"
            title="Deep Tissue Massage designed around your body."
            text="Deep tissue massage works on deeper muscle layers to address chronic tension, stiffness and persistent discomfort."
          />
          <div className="grid-3">
            <div className="card">
              <h3>Target Tight Muscles</h3>
              <p>
                Tell your therapist where you're feeling tight or uncomfortable
                so the session can focus on your priorities.
              </p>
            </div>
            <div className="card">
              <h3>Personalized Pressure</h3>
              <p>
                Deep tissue does not mean the same pressure everywhere.
                Communication helps keep the session appropriate for your
                comfort.
              </p>
            </div>
            <div className="card">
              <h3>Focused Areas</h3>
              <p>
                Neck, shoulders, back and legs can receive more targeted
                attention depending on what you need.
              </p>
            </div>
          </div>
        </div>
        </section>

      <section className="section-sm soft" aria-labelledby="deep-gallery-title">
        <div className="container">
          <SectionHead
            kicker="The setting matters too"
            id="deep-gallery-title"
            title="Focused treatment, relaxed surroundings."
          />
          <PhotoStrip
            photos={[
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_8.webp`,
                alt: "Massage beside a private pool in a tropical setting",
                width: 320,
                height: 320,
                caption: "Relaxed surroundings"
              },
              {
                src: IMG.home2,
                alt: "Massage treatment surrounded by palms and greenery",
                width: 320,
                height: 320,
                caption: "Tropical privacy"
              },
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_9.webp`,
                alt: "Luna Spa therapist preparing an in-home massage",
                width: 320,
                height: 320,
                caption: "Professional setup"
              }
            ]}
          />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead
            kicker="At your accommodation"
            title="Deep Tissue Massage at your Airbnb or villa."
            text="You don't need to leave your accommodation for focused bodywork. Luna Spa brings the service directly to your space in Sayulita."
          />
          <div className="quote">
            Finish your treatment and keep relaxing in the same place. No extra
            trip across town.
          </div>
        </div>
      </section>

      <section className="section luna-deep-fit">
        <div className="container">
          <SectionHead
            kicker="Is it right for you?"
            title="Choose based on the experience you want."
          />
          <div className="grid-3">
            <div className="card">
              <h3>Muscle Tension</h3>
              <p>
                A focused option when you want more than a gentle relaxation
                massage.
              </p>
            </div>
            <div className="card">
              <h3>Active Travelers</h3>
              <p>
                Useful for guests whose vacation includes surfing, hiking,
                training or other physical activities.
              </p>
            </div>
            <div className="card">
              <h3>Focused Bodywork</h3>
              <p>
                If you already prefer deeper pressure and targeted work, Deep
                Tissue may be a better fit.
              </p>
            </div>
          </div>
        </div>
        </section>

      <section className="section soft" id="pricing">
        <div className="container">
          <SectionHead
            kicker="Deep Tissue price"
            title="$1,050 MXN · 60 minutes."
            text="The current Luna Spa menu lists Deep Tissue Massage at 60 minutes for $1,050 MXN."
          />
          <div className="card">
            <div className="price-row">
              <div>
                <div className="price">$1,050 MXN</div>
                <div className="duration">
                  60-minute Deep Tissue Massage
                </div>
              </div>
              <a
                className="btn btn-primary"
                href={LINKS.bookDeepTissue}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Deep Tissue
              </a>
            </div>
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

      <section className="section" id="faq">
        <div className="container">
          <SectionHead kicker="Before you book" title="Frequently asked questions." />
          <FAQ items={FAQS_DEEP} />
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
              { to: "/after-surfing", label: "After Surfing" },
              { to: "/luminous-skin", label: "Luminous Skin" }
            ]}
          />
        </div>
      </section>
    </>
  );
}