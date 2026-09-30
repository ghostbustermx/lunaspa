import { useEffect } from "react";

const REVEAL_SELECTORS = [
  ".section-head",
  ".card",
  ".step",
  ".price-table-wrap",
  ".inline-cta",
  ".cta-box",
  ".quote",
  ".internal-links",
  ".faq"
];

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function useSiteEffects(pathname) {
  useEffect(() => {
    document.documentElement.classList.add("js");
    document.body.classList.add("page-ready");

    let progress = document.getElementById("luna-scroll-progress");
    if (!progress) {
      progress = document.createElement("div");
      progress.id = "luna-scroll-progress";
      progress.className = "scroll-progress";
      progress.setAttribute("aria-hidden", "true");
      document.body.appendChild(progress);
    }

    const header = document.querySelector(".site-header");

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (scrollTop / max) * 100 : 0;
      progress.style.width = pct + "%";
      if (header) header.classList.toggle("is-scrolled", scrollTop > 18);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const nodes = Array.from(
      document.querySelectorAll(REVEAL_SELECTORS.join(","))
    );
    nodes.forEach((el, i) => {
      el.classList.add("reveal");
      if (i % 4 === 1) el.classList.add("reveal-delay-1");
      if (i % 4 === 2) el.classList.add("reveal-delay-2");
      if (i % 4 === 3) el.classList.add("reveal-delay-3");
    });

    let observer = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      nodes.forEach((el) => observer.observe(el));
    } else {
      nodes.forEach((el) => el.classList.add("is-visible"));
    }

    const hero = document.querySelector(".hero");
    if (hero && !hero.querySelector(".ambient-glow")) {
      const glow = document.createElement("span");
      glow.className = "ambient-glow";
      glow.setAttribute("aria-hidden", "true");
      glow.style.right = "7%";
      glow.style.top = "18%";
      hero.appendChild(glow);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (observer) observer.disconnect();
    };
  }, [pathname]);
}