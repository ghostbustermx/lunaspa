import Seo from "./Seo";
import Breadcrumb from "./Breadcrumb";
import AnchorLink from "./AnchorLink";

export default function LegalPage({ type, eyebrow, title, intro, sections }) {
  return (
    <>
      <Seo title={title} description={intro} />
      <section className="hero">
        <div className="container">
          <Breadcrumb page={type} />
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="lead">{intro}</p>
        </div>
      </section>
      <section className="section">
        <div className="container legal-body">
          {sections.map((s, i) => (
            <div key={i}>
              <h3>{s.heading}</h3>
              <p>{s.text}</p>
            </div>
          ))}
          <p className="legal-note">
            Questions? Reach us any time via{" "}
            <AnchorLink to="/">our website</AnchorLink>.
          </p>
        </div>
      </section>
    </>
  );
}