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
      className={`bg-transparent w-full block rounded-lg ${
        active ? "unset" : "mb-2"
      } lg:flex`}
    >
      <video
        style={{ height: "75%", width: "100%", objectFit: "cover" }}
        autoPlay
        muted
        loop
        id="background-video"
      >
        <source src={eventcard_bg} type="video/mp4" />
      </video>
      <div className="w-[91.6%] h-[71.7%] absolute flex justify-center items-center">
        <div className="w-[50%] lg:w-[70%] m-auto">
          <img
            className="w-[480px] ml-8 rounded-md"
            src={`${data.images[0]?.url}`}
            alt=""
          />
        </div>

        <div className="w-full p-[20px] lg:[w-50%] flex flex-col justify-center">
          <h2 className={`${styles.productTitle}`}>{data.name}</h2>
          <p>{data.description}</p>
          <div className="flex py-2 justify-between">
            <div className="flex">
              <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                {data.originalPrice}$
              </h5>
              <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                {data.discountPrice}$
              </h5>
            </div>
            <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
              {data.sold_out} sold
            </span>
          </div>
          <CountDown data={data} />
          <br />
          <div className="flex items-center">
            <Link to={`/product/${data._id}?isEvent=true`}>
              <div className={`${styles.button} text-[#fff]`}>See Details</div>
            </Link>
            <div
              className={`${styles.button} text-[#fff] ml-5`}
              onClick={() => addToCartHandler(data)}
            >
              Add to Cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
