import React, { useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllBanners } from "../redux/actions/banner";
import { Link } from "react-router-dom";

const PopupBanner = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const { banners = [], isLoading } = useSelector((state) => state.banners || {});
  
  useEffect(() => {
    if (!banners.length) {
      dispatch(getAllBanners());
    }
  }, [dispatch, banners.length]);

  // Get the index from localStorage or start at 0
  const bannerIndex = parseInt(localStorage.getItem("bannerIndex") || "0", 10);

  // Select the banner based on the index
  const banner = banners[bannerIndex % banners.length];

  // Update the index in localStorage for the next visit
  useEffect(() => {
    if (banners.length) {
      localStorage.setItem("bannerIndex", (bannerIndex + 1) % banners.length);
    }
  }, [banners.length, bannerIndex]);

  if (!isVisible || isLoading || !banner) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="w-[400px] p-2 rounded-sm text-center relative">
        <button onClick={onClose}>
          <IoCloseCircle color="white" size={35} className="absolute top-1 right-1 cursor-pointer" />
        </button>
        <Link to="/page-not-found">
          <img
            className="object-contain"
            src={banner.imageUrl || "https://via.placeholder.com/400"}
            alt={banner.name || "Banner"}
            style={{ filter: "drop-shadow(0 0 10rem black)" }}
          />
          </Link>
          <div>
            {banner.description && (
              <p className="text-[12px] text-white">{banner.description}</p>
            )}
          </div>
          <div>
            {banner.duration && (
              <p className="text-[12px] text-white">{banner.duration}</p>
            )}
          </div>
          <div>
            {banner.license && (
              <p className="text-[12px] text-white">DTI Fair Trade Permit No. FTEB-{banner.license} Series of 2024.</p>
            )}
          </div>
      </div>
    </div>
  );
};

export default PopupBanner;