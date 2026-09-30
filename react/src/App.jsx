import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import InHome from "./pages/InHome";
import DeepTissue from "./pages/DeepTissue";
import Couples from "./pages/Couples";
import Group from "./pages/Group";
import Reviews from "./pages/Reviews";
import ReviewsScore from "./pages/ReviewsScore";
import WellnessGuide from "./pages/WellnessGuide";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/in-home-massage" element={<InHome />} />
        <Route path="/deep-tissue-massage" element={<DeepTissue />} />
        <Route path="/couples-massage" element={<Couples />} />
        <Route path="/group-massage" element={<Group />} />
        <Route path="/reviews" element={<Reviews />} />
        {/* Modulo de la plantilla de reseñas: sin enlace en menu todavia. */}
        <Route path="/reviews-score" element={<ReviewsScore />} />
        <Route path="/wellness-guide" element={<WellnessGuide />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}