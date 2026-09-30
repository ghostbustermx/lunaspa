import { useEffect, useState } from "react";

const HERO_SLIDES = ["hero_1.webp", "hero_2.webp", "hero_3.webp"];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      3000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="hero-carousel" aria-hidden="true">
      {HERO_SLIDES.map((name, i) => (
        <img
          key={name}
          className={"hero-slide" + (i === index ? " is-active" : "")}
          src={`${import.meta.env.BASE_URL}assets/${name}`}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          draggable="false"
        />
      ))}
      <div className="hero-overlay" aria-hidden="true"></div>
    </div>
  );
}