import { useState } from "react";
import ServicesDescriptionModal from "./ServicesDescriptionModal";

export default function ServicesDescriptionBtn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="services-desc-btn"
        onClick={() => setOpen(true)}
      >
        Services Description
      </button>
      {open && <ServicesDescriptionModal onClose={() => setOpen(false)} />}
    </>
  );
}