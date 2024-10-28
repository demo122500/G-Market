import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { assets } from "../Assests/assets";

const Error = () => {
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
        <h1 className="gradient-text text-6xl font-bold">404 Error</h1>
        <p className="gradient-text text-2xl">Page Not Found!</p>
      </div>
      <Footer />
    </div>
  );
};

export default Error;
