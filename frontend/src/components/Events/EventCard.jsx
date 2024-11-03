import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import eventcard_bg from "./eventcard_bg.mp4";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item Already in Cart");
    } else {
      if (data.stock < 1) {
        toast.error("Out of Stock");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item Added to Cart Successfully");
      }
    }
  };
  return (
    <div
      className={`relative h-[70vh] w-full rounded-lg ${
        active ? "unset" : "mb-2"
      } overflow-hidden`}
    >
      {/* Video Background */}
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        id="background-video"
      >
        <source src={eventcard_bg} type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-green-800/50 via-green-500/30 to-green-800/50" /> */}

      {/* Content Container */}
      <div className="absolute inset-0 flex justify-center items-center px-8 py-12">
        <div className="relative flex border border-white/10 flex-col md:flex-row w-full max-w-[1200px] items-center gap-8 backdrop-blur-lg rounded-lg p-6 shadow-2xl">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              style={{ filter: "drop-shadow(0 0 3rem black)" }}
              className="w-[300px] lg:w-[400px] rounded-lg"
              src={`${data.images[0]?.url}`}
              alt="Product"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center w-full max-w-[600px] text-white">
            <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>
            <p className="text-gray-100 mb-4">{data.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h5 className="text-lg font-medium text-red-500 line-through pr-2">
                  ${data.originalPrice}
                </h5>
                <h5 className="text-xl font-bold text-white">
                  ${data.discountPrice}
                </h5>
              </div>
              <span className="text-md text-green-200 font-semibold">
                {data.sold_out} sold
              </span>
            </div>

            <CountDown data={data} />

            <div className="flex items-center gap-4 mt-6">
              <Link to={`/product/${data._id}?isEvent=true`}>
                <div className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md cursor-pointer hover:bg-green-700 transition">
                  See Details
                </div>
              </Link>
              <button
                className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md cursor-pointer hover:bg-green-700 transition"
                onClick={() => addToCartHandler(data)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
