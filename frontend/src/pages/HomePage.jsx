import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import { useLocation } from "react-router-dom";
import PopupBanner from "../components/PopupBanner";

const HomePage = () => {
  const location = useLocation();
  const [isPopupActive, setIsPopupActive] = useState(false);

  useEffect(() => {
    setIsPopupActive(true);
  }, []);

  useEffect(() => {
    if (isPopupActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    console.log("Popup active:", isPopupActive);

    return () => document.body.classList.remove("no-scroll");
  }, [isPopupActive]);

  return (
    <div>
      {/* Popup banner visible on all pages */}
      {location.pathname === "/" && (
        <PopupBanner
          isVisible={isPopupActive}
          onClose={() => setIsPopupActive(false)}
        />
      )}

      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;