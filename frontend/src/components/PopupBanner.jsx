import React, { useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllBanners } from "../redux/actions/banner";

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
      <div className="bg-transparent w-[400px] p-2 rounded-sm text-center relative">
        <button onClick={onClose}>
          <IoCloseCircle color="white" size={40} className="absolute top-2 right-2 cursor-pointer" />
        </button>
        <img
          src={banner.imageUrl || "https://via.placeholder.com/400"}
          alt={banner.name || "Banner"}
          style={{ filter: "drop-shadow(0 0 10rem black)" }}
        />
      </div>
    </div>
  );
};

export default PopupBanner;