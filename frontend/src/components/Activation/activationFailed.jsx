import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { assets } from "../../Assests/assets";

const ActivationFailed = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          backgroundImage: `linear-gradient(121deg, rgba(115, 189, 58, 0.30) 0%, rgba(115, 189, 58, 0.20) 46%, rgba(115, 189, 58, 0.10) 100%), url(${assets.g_large})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100",
        }}
        className="h-[50vh] flex flex-col items-center justify-center"
      >
        <div className="bg-white/30 px-6 py-4 rounded-full">
          <p className="gradient-text text-2xl">
            Your token has expired or is invalid.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ActivationFailed;
