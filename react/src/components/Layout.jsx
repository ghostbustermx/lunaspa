import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileBooking from "./MobileBooking";
import ScrollTop from "./ScrollTop";
import Splash from "./Splash";
import LeafShadows from "./LeafShadows";
import ServicesDescriptionBtn from "./ServicesDescriptionBtn";
import PricesSideBtn from "./PricesSideBtn";
import FaqSideBtn from "./FaqSideBtn";
import { useSiteEffects, scrollToId } from "../lib/effects";

const PAGE_CLASS = {
  "/": "page-home",
  "/in-home-massage": "page-inhome",
  "/deep-tissue-massage": "page-deep",
  "/couples-massage": "page-couples",
  "/group-massage": "page-group",
  "/reviews": "page-reviews",
  "/reviews-score": "page-reviews-score",
  "/wellness-guide": "page-guide"
};

export default function Layout() {
  const location = useLocation();

  useSiteEffects(location.pathname);

  useEffect(() => {
    document.body.classList.remove(...Object.values(PAGE_CLASS));
    document.body.classList.add(
      PAGE_CLASS[location.pathname] ||
        (location.pathname.startsWith("/blog") ? "page-guide" : "page-home")
    );
  }, [location.pathname]);

  useEffect(() => {
    const state = location.state;
    const hash = location.hash;

    if (state && state.scrollTo) {
      const t = setTimeout(() => scrollToId(state.scrollTo), 80);
      window.history.replaceState({}, "");
      return () => clearTimeout(t);
    }
    if (hash) {
      const t = setTimeout(
        () => scrollToId(decodeURIComponent(hash.slice(1))),
        80
      );
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash, location.state]);

  return (
    <>
      <Splash />
      <LeafShadows />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <MobileBooking />
      <ScrollTop />
      <ServicesDescriptionBtn />
      <PricesSideBtn />
      <FaqSideBtn />
    </>
  );
}