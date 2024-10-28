import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../Assests/animations/success.json";
import styles from "../styles/styles";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleViewOrders = () => {
    navigate("/profile", { state: { activeTab: 2 } });
  };

  const handleViewProducts = () => {
    navigate("/products");
  };

  // Improve 10/24/2024
  return (
    <div className="flex flex-col py-4 gap-2">
      <Lottie options={defaultOptions} width={200} height={200} />
      <h5 className="text-center text-xl text-[#000000a1]">
        Order Placed Successfully!
      </h5>
      <div className="items-center justify-center flex gap-4">
        <button
          onClick={handleViewOrders}
          className={`${styles.button} text-white font-medium rounded-sm`}
        >
          View Orders
        </button>
        <p>Or</p>
        <button
          onClick={handleViewProducts}
          className={`${styles.button} w-[180px] text-white font-medium rounded-sm`}
        >
          Continue Shopping
        </button>
      </div>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
