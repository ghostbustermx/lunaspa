import { Link } from "react-router-dom";

export default function RatingStrip() {
  return (
    <div className="rating-strip">
      <div>
        <strong className="rating-strip-title">Trusted experience</strong>
        <div className="small">
          A compact trust layer immediately after the service introduction.
        </div>
      </div>
      <div className="center">
        <div className="rating-big">★★★★★</div>
        <div className="small">
          <strong className="rating-strip-navy">5.0</strong> · Guest rating
        </div>
      </div>
      <div className="rating-strip-right">
        <div className="small">Explore all experiences</div>
        <Link className="rating-strip-royal" to="/reviews">
          View Reviews →
        </Link>
      </div>
    </div>
  );
}