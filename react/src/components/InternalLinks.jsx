import { Link } from "react-router-dom";

export default function InternalLinks({ links }) {
  return (
    <div className="internal-links">
      {links.map((l) => (
        <Link key={l.label} to={l.to}>
          {l.label} →
        </Link>
      ))}
    </div>
  );
}