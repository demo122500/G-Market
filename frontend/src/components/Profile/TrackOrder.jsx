import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import Lottie from "react-lottie";
import orderConfirmedAnimation from '../../Assests/animations/order-confirmed.json';
import preparingToShipAnimation from '../../Assests/animations/preparing-to-ship.json';
import pickedUpAnimation from '../../Assests/animations/pickedup-animation.json';
import arrivedAnimation from '../../Assests/animations/arrived.json';
import outForDeliveryAnimation from '../../Assests/animations/out-for-delivery.json';
import deliveredAnimation from '../../Assests/animations/delivered.json'

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);

  const getAnimationOptions = (animationData) => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {data ? (
        <>
          {data.status === "Processing" && (
            <div className="flex flex-col items-center justify-center">
              <Lottie options={getAnimationOptions(orderConfirmedAnimation)} width={300} height={300} />
              <h1 className="text-[16px] font-[500] text-[#333]">Your Order is Confirmed and the Seller is preparing your order.</h1>
            </div>
          )}
          {data.status === "Transferred to delivery partner" && (
            <div className="flex flex-col items-center justify-center">
              <Lottie options={getAnimationOptions(preparingToShipAnimation)} width={200} height={200} />
              <h1 className="text-[16px] font-[500] text-[#333]">Your Order is on the way to our delivery partner.</h1>
            </div>
          )}
          {data.status === "Shipping" && (
            <div className="flex flex-col items-center justify-center">
              <Lottie options={getAnimationOptions(pickedUpAnimation)} width={200} height={200} />
              <h1 className="text-[16px] font-[500] text-[#333]">Order has been picked up by our delivery partner.</h1>
            </div>
          )}
          {data.status === "Received" && (
            <div className="flex flex-col items-center justify-center">
              <Lottie options={getAnimationOptions(arrivedAnimation)} width={200} height={200} />
              <h1 className="text-[16px] font-[500] text-[#333] mt-5">Order has arrived at Delivery Hub.</h1>
            </div>
          )}
          {data.status === "On the way" && (
            <div className="flex flex-col items-center justify-center">
              <Lottie options={getAnimationOptions(outForDeliveryAnimation)} width={300} height={300} />
              <h1 className="text-[16px] font-[500] text-[#333]">Out for Delivery.</h1>
            </div>
          )}
          {data.status === "Delivered" && (
            <div className="flex flex-col items-center justify-center">
              <Lottie options={getAnimationOptions(deliveredAnimation)} width={300} height={300} />
              <h1 className="text-[16px] font-[500] text-[#333] mt-3">Your order is delivered. Don't forget to drop your reviews and insights on our product.</h1>
            </div>
          )}
          {data.status === "Processing refund" && (
            <div>
              <h1 className="text-[20px]">Your refund is processing!</h1>
            </div>
          )}
          {data.status === "Refund Success" && (
            <div>
              <h1 className="text-[20px]">Your Refund is success!</h1>
            </div>
          )}
        </>
      ) : (
        <h1 className="text-[20px]">Order not found</h1>
      )}
    </div>
  );
};

export default TrackOrder;
