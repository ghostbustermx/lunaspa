import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";
import HeroPhoto from "../components/HeroPhoto";
import QuickBook from "../components/HeroParts";
import RatingStrip from "../components/RatingStrip";
import SectionHead from "../components/SectionHead";
import Steps from "../components/Steps";
import FAQ from "../components/Faq";
import PriceTable from "../components/PriceTable";
import RoyalCta from "../components/RoyalCta";
import InternalLinks from "../components/InternalLinks";
import { PhotoStrip } from "../components/Photos";
import { SEO, LINKS, PRICE_ROWS, FAQS_COUPLES } from "../lib/site";
import { IMG } from "../lib/images";

export default function Couples() {
  const seo = SEO.couples;

  const stickerSrc = `${import.meta.env.BASE_URL}assets/sticker_azul.webp`;

  return (
    <>
      <Seo title={seo.title} description={seo.description} jsonLd={seo.jsonLd} />

      <section className="hero couples-hero">
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
          <Breadcrumb page="Couples Massage Sayulita" />
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Couples Massage Sayulita</span>
              <h1>
                Couples Massage in Sayulita — A Private Spa Experience for Two
              </h1>
              <p className="lead">
                Relax together without leaving your Airbnb, villa or hotel.
              </p>
              <RatingStrip />
              <span className="price-pill">✦ From $950 MXN · 60 min</span>
              <p className="micro">
                Your vacation is already the perfect excuse to slow down. Make
                it even better with a private massage experience in the comfort
                of your own space.
              </p>
            </div>
            <div className="hero-card">
              <HeroPhoto
                src={`${import.meta.env.BASE_URL}assets/luna_spa_10.webp`}
                alt="Two massage tables prepared for a private couples spa experience at Luna Spa"
              />
              <QuickBook />
            </div>
          </div>
        </div>
        </section>

      <section className="section visual-story reverse" aria-labelledby="two-title">
        <div className="container">
          <div className="story-grid">
            <div className="story-image">
              <img
                src={IMG.home1}
                alt="Couples massage setting under a thatched palapa with an ocean view"
                loading="lazy"
                width="478"
                height="602"
              />
            </div>
            <div className="story-copy">
              <span className="image-kicker">A ritual for two</span>
              <h2 id="two-title">
                Make the massage part of the experience you share.
              </h2>
              <p>
                A couples appointment can turn a regular vacation afternoon
                into a private wellness ritual, right where you are staying.
              </p>
              <ul className="story-points">
                <li>Coordinate two treatments for the same appointment.</li>
                <li>Tell us if each person wants a different massage.</li>
                <li>
                  Enjoy a private setting without adding another stop to your
                  day.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            kicker="Private experience for two"
            title="Enjoy a couples massage without leaving your villa or hotel."
            text="You don't need to find a spa or arrange transportation. Tell us where you're staying, choose your preferred treatments and we'll coordinate the appointment based on availability."
          />
          <div className="grid-3">
            <div className="card">
              <h3>Private Space</h3>
              <p>
                Enjoy your massage in the environment you've chosen for your
                vacation.
              </p>
            </div>
            <div className="card">
              <h3>Romantic Getaway</h3>
              <p>
                Create time together without adding another destination to your
                itinerary.
              </p>
            </div>
            <div className="card">
              <h3>Different Treatments</h3>
              <p>
                One person can prefer Relaxing while the other chooses Deep
                Tissue.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-sm soft"
        aria-labelledby="couples-spaces-title"
      >
        <div className="container">
          <SectionHead
            kicker="For two, beautifully simple"
            id="couples-spaces-title"
            title="Spaces that make slowing down feel natural."
          />
          <PhotoStrip
            photos={[
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_11.webp`,
                alt: "Luna Spa therapist giving a massage in a private accommodation",
                width: 320,
                height: 320,
                caption: "Personalized treatments"
              },
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_12.webp`,
                alt: "Massage beside a tropical pool at a private accommodation",
                width: 320,
                height: 320,
                caption: "Private tropical setting"
              },
              {
                src: `${import.meta.env.BASE_URL}assets/luna_spa_13.webp`,
                alt: "Massage treatment with palm trees and tropical greenery",
                width: 320,
                height: 320,
                caption: "Vacation, uninterrupted"
              }
            ]}
          />
        </div>
      </section>

      <section className="section soft" id="pricing">
        <div className="container">
          <SectionHead
            kicker="Couples massage prices"
            title="Choose each person's treatment."
            text="The current menu lists individual treatment prices rather than a separate couples package rate."
          />
          <PriceTable rows={PRICE_ROWS} />
          <p className="note" style={{ marginTop: 12 }}>
            For a couples appointment, contact Luna Spa for current availability
            and the applicable total based on the treatments selected.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            kicker="Special occasions"
            title="Perfect for more than just a regular vacation day."
          />
          <div className="grid-2">
            <div className="card">
              <h3>{"Anniversaries & Honeymoons"}</h3>
              <p>
                Add a private wellness experience to your romantic getaway.
              </p>
            </div>
            <div className="card">
              <h3>{"Birthdays & Getaways"}</h3>
              <p>
                Make a birthday vacation or couples trip feel more personal
                with time to slow down together.
              </p>
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
          <FAQ items={FAQS_COUPLES} />
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
              { to: "/in-home-massage", label: "In-Home Massage" },
              { to: "/deep-tissue-massage", label: "Deep Tissue Massage" },
              { to: "/group-massage", label: "Group Massage" }
            ]}
          />
        </div>
      </section>
    </>
  );
}