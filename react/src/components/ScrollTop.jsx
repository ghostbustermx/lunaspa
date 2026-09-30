import { useEffect, useState } from "react";

const SHOW_AFTER = 0.08;

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const threshold = doc.scrollHeight * SHOW_AFTER;
      setVisible(window.scrollY >= threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className={"scroll-top" + (visible ? " visible" : "")}
      aria-hidden={!visible}
    >
      <button
        className="scroll-top__btn"
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}