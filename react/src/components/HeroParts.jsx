import { LINKS } from "../lib/site";

export default function QuickBook() {
  return (
    <div className="quick-book">
      <div>
        <strong>Ready for your Luna Spa moment?</strong>
        <span>Send your preferred treatment + location.</span>
      </div>
      <a
        className="btn"
        href={LINKS.bookMassage}
        target="_blank"
        rel="noopener noreferrer"
      >
        Check Availability on WhatsApp
      </a>
    </div>
  );
}