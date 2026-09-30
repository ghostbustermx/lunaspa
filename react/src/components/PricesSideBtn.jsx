import AnchorLink from "./AnchorLink";

export default function PricesSideBtn() {
  return (
    <AnchorLink className="prices-side-btn" to="/#pricing" aria-label="Prices">
      {"PRICES".split("").map((letter) => (
        <span key={letter} aria-hidden="true">
          {letter}
        </span>
      ))}
    </AnchorLink>
  );
}