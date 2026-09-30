import AnchorLink from "./AnchorLink";

export default function Breadcrumb({ page }) {
  return (
    <div className="breadcrumb">
      <AnchorLink to="/">Luna Spa</AnchorLink>{" "}
      <span aria-hidden="true">›</span> {page}
    </div>
  );
}