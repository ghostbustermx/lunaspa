import AnchorLink from "./AnchorLink";
import { LINKS } from "../lib/site";

export default function MobileBooking() {
  return (
    <div className="mobile-booking" aria-label="Quick booking">
      <AnchorLink className="btn btn-secondary" to="/#pricing">
        See Prices
      </AnchorLink>
      <a
        className="btn btn-gold"
        href={LINKS.bookMassage}
        target="_blank"
        rel="noopener noreferrer"
      >
        Book on WhatsApp
      </a>
    </div>
  );
}