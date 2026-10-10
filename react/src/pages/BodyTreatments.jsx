import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";
import HeroPhoto from "../components/HeroPhoto";
import QuickBook from "../components/HeroParts";
import RatingStrip from "../components/RatingStrip";
import SectionHead from "../components/SectionHead";
import FAQ from "../components/Faq";
import RoyalCta from "../components/RoyalCta";
import InternalLinks from "../components/InternalLinks";
import ViewBookButton from "../components/ViewBookButton";
import { PhotoMosaic } from "../components/Photos";
import { SEO, LINKS, FAQS_BODY } from "../lib/site";
import { IMG } from "../lib/images";

export default function BodyTreatments() {
  const seo = SEO.body;

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
          <Breadcrumb page="Body Treatments & Facials" />
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Skin rituals & facials · Sayulita</span>
              <h1>
                Body Treatments &amp; Facials in Sayulita — Bridal Veil +
                Custom Facials
              </h1>
              <p className="lead">
                Go beyond massage: a full-body ritual before a special event,
                or a facial customized to your skin type. Exfoliation,
                hydration and glowing skin — delivered at your Airbnb, villa or
                hotel.
              </p>
              <RatingStrip />
              <span className="price-pill">✦ From $900 MXN · 60 min</span>
              <p className="micro">
                Bridal Veil body treatment (2 hrs · $2,000 MXN) and custom
                facials from $900 MXN — brought to your accommodation.
              </p>
            </div>
            <div className="hero-card">
              <HeroPhoto
                src={IMG.therapeutic}
                alt="Custom facial treatment at Luna Spa for radiant, luminous skin in Sayulita"
              />
              <QuickBook href={LINKS.bookBody} />
            </div>
          </div>
        </div>
      </section>

      <section className="section soft" id="body-treatments">
        <div className="container">
          <SectionHead
            kicker="Body treatments & facials"
            title="Body rituals and facials for luminous skin."
            text="Go beyond massage: a full-body ritual before a special event, or a facial customized to your skin type."
          />
          <div className="card">
            <span className="kicker">Body treatment</span>
            <h3>Bridal Veil</h3>
            <p>
              Exfoliation, body wrap and hydration that leaves skin smooth,
              luminous and silky — ideal before special events.
            </p>
            <div className="price">$2,000 MXN</div>
            <div className="duration">2 hrs</div>
            <ViewBookButton
              treatment={{ name: "Bridal Veil", duration: "2 hrs", price: "$2,000 MXN" }}
            />
          </div>
          <span
            className="kicker"
            style={{ display: "block", margin: "28px 0 4px" }}
          >
            Facials
          </span>
          <div className="grid-3">
            <div className="card">
              <h3>Deep Cleanse Facial</h3>
              <p>
                <em>{"“Purity and freshness in a single ritual.”"}</em>{" "}
                Purifying treatment designed to unclog pores, remove blackheads,
                dead cells and accumulated impurities. Fully customized to your
                skin type.
              </p>
              <div className="price">$1,200 MXN</div>
              <div className="duration">75–90 min</div>
              <ViewBookButton
                treatment={{
                  name: "Deep Cleanse Facial",
                  duration: "75–90 min",
                  price: "$1,200 MXN"
                }}
              />
            </div>
            <div className="card">
              <h3>Revitalizing Facial</h3>
              <p>
                Intensive brightening therapy designed to restore vitality,
                luminosity and firmness to dull, fatigued or stressed skin.
                Vitamin, antioxidant and nourishing active concentrates
                regenerate skin texture and deeply hydrate, for an instantly
                radiant, rested look.
              </p>
              <div className="price">$1,100 MXN</div>
              <div className="duration">60 min</div>
              <ViewBookButton
                treatment={{
                  name: "Revitalizing Facial",
                  duration: "60 min",
                  price: "$1,100 MXN"
                }}
              />
            </div>
            <div className="card">
              <h3>Oxygenating Facial</h3>
              <p>
                Detoxifying treatment that stimulates cellular respiration and
                skin microcirculation. Ideal for congested skin exposed to
                pollution, sun or environmental stress. Helps eliminate toxins,
                oxygenate tissues and restore the skin's natural balance,
                leaving it visibly brighter, fresher and full of energy.
              </p>
              <div className="price">$1,100 MXN</div>
              <div className="duration">60 min</div>
              <ViewBookButton
                treatment={{
                  name: "Oxygenating Facial",
                  duration: "60 min",
                  price: "$1,100 MXN"
                }}
              />
            </div>
            <div className="card">
              <h3>Hydrating Facial</h3>
              <p>
                <em>{"“Deep hydration, radiant skin.”"}</em> Restores the
                skin's optimal moisture level and relieves the feeling of
                tightness, leaving it fresh, silky and radiant.
              </p>
              <div className="price">$900 MXN</div>
              <div className="duration">60 min</div>
              <ViewBookButton
                treatment={{
                  name: "Hydrating Facial",
                  duration: "60 min",
                  price: "$900 MXN"
                }}
              />
            </div>
            <div className="card">
              <h3>Calming Facial for Sensitive Skin</h3>
              <p>
                Decongesting and hydrating treatment especially formulated for
                sensitive, reactive or rosacea-prone skin, and skin irritated by
                sun and wind exposure. Soothing botanical actives, cold masks
                and gentle massage techniques reduce redness, relieve burning
                and restore skin's natural barrier, returning comfort,
                freshness and softness to sensitive skin.
              </p>
              <div className="price">$1,000 MXN</div>
              <div className="duration">60 min</div>
              <ViewBookButton
                treatment={{
                  name: "Calming Facial for Sensitive Skin",
                  duration: "60 min",
                  price: "$1,000 MXN"
                }}
              />
            </div>
            <div className="card">
              <h3>Luna Facial</h3>
              <p>
                Designed strictly around your needs. This personalized
                experience combines a specific cleanse, exfoliation and a
                customized mask with a relaxing massage of the face, neck and
                scalp, leaving skin radiant and balanced.
              </p>
              <div className="price">$1,300 MXN</div>
              <div className="duration">90 min</div>
              <ViewBookButton
                treatment={{
                  name: "Luna Facial",
                  duration: "90 min",
                  price: "$1,300 MXN"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section visual-story" aria-labelledby="skin-ritual-title">
        <div className="container">
          <div className="story-grid">
            <div className="story-copy">
              <span className="image-kicker">Skin rituals, done right</span>
              <h2 id="skin-ritual-title">
                Your skin, refreshed wherever you are.
              </h2>
              <p>
                Every facial and body treatment is customized to your skin type
                and delivered at your accommodation, so you can glow without
                leaving your vacation behind.
              </p>
              <ul className="story-points">
                <li>
                  Tell us your preferred treatment and your skin concerns.
                </li>
                <li>Share your Airbnb, villa or hotel location.</li>
                <li>We confirm availability and prepare the ritual for you.</li>
              </ul>
            </div>
            <div className="story-image">
              <img
                src={`${import.meta.env.BASE_URL}assets/luna_spa_14.webp`}
                alt="Spa treatment prepared in an ocean-view palapa at Luna Spa"
                loading="lazy"
                width="478"
                height="602"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm soft" aria-labelledby="skin-gallery-title">
        <div className="container">
          <SectionHead
            kicker="Built around your skin"
            id="skin-gallery-title"
            title="Silky skin, glowing finish."
          />
          <PhotoMosaic
            photos={[
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_12.webp`,
                alt: "Relaxing facial treatment at Luna Spa in Sayulita",
                width: 320,
                height: 320,
                caption: "Custom facial ritual"
              },
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_13.webp`,
                alt: "Spa products and towels prepared for a body treatment",
                width: 320,
                height: 320,
                caption: "Bridal Veil preparation"
              },
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_11.webp`,
                alt: "Tranquil treatment space surrounded by tropical greenery",
                width: 320,
                height: 320,
                caption: "In-home spa setting"
              }
            ]}
          />
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <SectionHead kicker="Before you book" title="Frequently asked questions." />
          <FAQ items={FAQS_BODY} />
        </div>
      </section>

      <RoyalCta
        title="Ready for a skin reset?"
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
              { to: "/after-surfing", label: "After Surfing" },
              { to: "/luminous-skin", label: "Luminous Skin" }
            ]}
          />
        </div>
      </section>
    </>
  );
}