import AnchorLink from "./AnchorLink";

export default function FaqSideBtn() {
  return (
    <AnchorLink className="faq-side-btn" to="/#faq" aria-label="FAQ">
      {"FAQ".split("").map((letter) => (
        <span key={letter} aria-hidden="true">
          {letter}
        </span>
      ))}
    </AnchorLink>
  );
}