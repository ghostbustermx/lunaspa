import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DELAY = 8000;
const FADE = 650;

const PETAL_IMG = `${import.meta.env.BASE_URL}assets/splash/petalos_2.webp`;

const PETALS = [
  { l: "-6vw",  t: "2vh",   s: 610, anim: "petal-path-a", dur: 22, del: 0,   blur: 0,    op: 0.95, sc: 1 },
  { l: "-4vw",  t: "14vh",  s: 530, anim: "petal-path-a", dur: 26, del: 0.6, blur: 2,    op: 0.8,  sc: 0.85 },
  { l: "-8vw",  t: "32vh",  s: 830, anim: "petal-path-a", dur: 28, del: 1.2, blur: 4,    op: 0.6,  sc: 1.15 },
  { l: "-5vw",  t: "56vh",  s: 460, anim: "petal-path-a", dur: 24, del: 1.8, blur: 2.5,  op: 0.85, sc: 0.9 },
  { l: "108vw", t: "4vh",   s: 580, anim: "petal-path-b", dur: 22, del: 0.3, blur: 0,    op: 0.95, sc: 1 },
  { l: "105vw", t: "24vh",  s: 490, anim: "petal-path-b", dur: 26, del: 0.9, blur: 2,    op: 0.75, sc: 0.85 },
  { l: "110vw", t: "46vh",  s: 780, anim: "petal-path-b", dur: 28, del: 1.5, blur: 4,    op: 0.55, sc: 1.15 },
  { l: "106vw", t: "70vh",  s: 480, anim: "petal-path-b", dur: 23, del: 2.1, blur: 1.5,  op: 0.9,  sc: 0.95 },
  { l: "-9vw",  t: "42vh",  s: 900, anim: "petal-path-c", dur: 30, del: 2.6, blur: 5,    op: 0.5,  sc: 1.2 },
  { l: "24vw",  t: "64vh",  s: 660, anim: "petal-path-d", dur: 20, del: 0.5, blur: 2,    op: 0.75, sc: 1 },
  { l: "62vw",  t: "70vh",  s: 490, anim: "petal-path-d", dur: 18, del: 1.4, blur: 0,    op: 0.9,  sc: 0.9 },
  { l: "40vw",  t: "-8vh",  s: 730, anim: "petal-path-e", dur: 26, del: 2.2, blur: 3.5,  op: 0.6,  sc: 1.1 },
  { l: "76vw",  t: "-10vh", s: 540, anim: "petal-path-e", dur: 22, del: 3.0, blur: 1.5,  op: 0.85, sc: 0.85 }
];

export default function Splash() {
  const location = useLocation();
  // El splash es la portada de entrada al sitio: si el visitante abre una ruta
  // interna directo (recargando o pegando la URL) se salta el splash, si no al
  // terminarlo lo expulsaria a la home y perderia la pagina que abrio.
  const [closing, setClosing] = useState(false);
  const [gone, setGone] = useState(() => location.pathname !== "/");
  const [isHome] = useState(() => location.pathname === "/");

  useEffect(() => {
    if (!isHome) return;
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => {
      document.body.style.overflow = "";
      setClosing(true);
    }, DELAY);
    const t2 = setTimeout(() => {
      setGone(true);
    }, DELAY + FADE);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      className={"splash" + (closing ? " closing" : "")}
      role="dialog"
      aria-label="Bienvenido a Luna Spa"
    >
      <div className="splash-frame">
        <div className="splash-frame-inner">
          <img
            className="splash-image-full"
            src={`${import.meta.env.BASE_URL}assets/splash/splash_screen.webp`}
            alt="Luna Spa"
            loading="eager"
            draggable="false"
          />
          <p className="splash-tagline">Massage &amp; Wellness in Sayulita</p>
          <h1 className="splash-headline">
            Your moment to pause &amp; reconnect.
          </h1>
        </div>
      </div>
      <div className="splash-petals" aria-hidden="true">
        {PETALS.map((p, i) => (
          <img
            key={i}
            className="splash-petal"
            src={PETAL_IMG}
            alt=""
            loading="eager"
            draggable="false"
            style={{
              "--p-l": p.l,
              "--p-t": p.t,
              "--p-s": p.s + "px",
              "--p-blur": p.blur + "px",
              "--p-op": p.op,
              "--p-dur": p.dur + "s",
              "--p-del": p.del + "s",
              "--p-scale": p.sc,
              "--p-anim": p.anim
            }}
          />
        ))}
      </div>
    </div>
  );
}