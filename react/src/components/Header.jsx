import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AnchorLink from "./AnchorLink";
import AboutModal from "./AboutModal";
import { LINKS } from "../lib/site";
import { IMG } from "../lib/images";

const SERVICES = [
  { to: "/#treatments", label: "Massages" },
  { to: "/moonlight-couples-ritual", label: "Moonlight Couples Ritual" },
  { to: "/sayulita-reset", label: "Sayulita Reset" },
  { to: "/after-surfing", label: "After Surfing" },
  { to: "/luminous-skin", label: "Luminous Skin" },
  { to: "/body-treatments-facials", label: "Body Treatments & Facials" }
];

function isActive(pathname, to) {
  const hashIndex = to.indexOf("#");
  const path = hashIndex >= 0 ? to.slice(0, hashIndex) : to;
  return pathname === (path === "" ? "/" : path);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  const servicesActive = SERVICES.some((item) =>
    isActive(location.pathname, item.to)
  );

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    function onDown(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
        setServicesOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function toggle() {
    setOpen((v) => !v);
  }

  function close() {
    setOpen(false);
    setServicesOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="nav container" ref={navRef} aria-label="Primary navigation">
        <Link className="brand" to="/" aria-label="Luna Spa in Sayulita home">
          <img src={IMG.logo} alt="Luna Spa logo" width="56" height="56" />
          <span className="brand-text">
            Luna Spa<small>Sayulita · Mexico</small>
          </span>
        </Link>
<div className={"nav-links" + (open ? " open" : "")}>
          <AnchorLink
          to="/"
          onClick={() => {
            close();
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className={isActive(location.pathname, "/") ? "is-active" : ""}
        >
          Home
        </AnchorLink>
          <div
            className={"nav-dropdown" + (servicesOpen ? " is-open" : "")}
          >
            <button
              type="button"
              className={
                "nav-dropdown-btn" +
                (servicesOpen ? " is-open" : "") +
                (servicesActive ? " is-active" : "")
              }
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <svg
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="nav-dropdown-panel">
              {SERVICES.map((item) => (
                <AnchorLink
                  key={item.to}
                  to={item.to}
                  onClick={close}
                  className={isActive(location.pathname, item.to) ? "is-active" : ""}
                >
                  {item.label}
                </AnchorLink>
              ))}
            </div>
          </div>
          <AnchorLink
          to="/reviews"
          onClick={close}
          className={isActive(location.pathname, "/reviews") ? "is-active" : ""}
        >
          Reviews ★★★★★
        </AnchorLink>
          <AnchorLink
            to="/wellness-guide"
            onClick={close}
            className={isActive(location.pathname, "/wellness-guide") || location.pathname.startsWith("/blog") ? "is-active" : ""}
          >
            Wellness Guide
          </AnchorLink>
          <button
            type="button"
            className="nav-about"
            onClick={() => setAboutOpen(true)}
          >
            About us
          </button>
          <a
          className="nav-social"
          href={LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Luna Spa on Instagram"
          onClick={close}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span className="nav-social-label">Instagram</span>
        </a>
        <a
          className="nav-cta"
          href={LINKS.bookMassage}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
        >
          Book on WhatsApp
        </a>
        </div>
        <a
          className="nav-cta mobile-menu"
          href={LINKS.bookMassage}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book a massage on WhatsApp"
        >
          Book
        </a>
        <button
          className={"hamburger" + (open ? " is-open" : "")}
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-nav-links"
          onClick={toggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
    </header>
  );
}