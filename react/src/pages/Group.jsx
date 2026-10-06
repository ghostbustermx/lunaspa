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
import ViewBookButton from "../components/ViewBookButton";
import { PhotoMosaic } from "../components/Photos";
import { SEO, LINKS, PRICE_ROWS, FAQS_GROUP } from "../lib/site";
import { IMG } from "../lib/images";

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
                src={IMG.group1}
                alt="Group massage experience prepared for friends and retreats at Luna Spa in Sayulita"
              />
              <QuickBook href={LINKS.bookLuminous} />
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