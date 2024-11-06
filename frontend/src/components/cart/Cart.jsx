import React, { useState } from "react";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import { IoArrowForward, IoBagHandleOutline } from "react-icons/io5";
import { HiMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import animationData from "../../Assests/animations/empty_cart.json";
import Lottie from "react-lottie";
import animationDataTwo from "../../Assests/animations/button_loader.json";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  // Empty cart animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleViewProducts = () => {
    navigate("/products");
  };

  // checkout button loader
  const defaultOptionTwo = {
    loop: true,
    autoplay: true,
    animationData: animationDataTwo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCheckoutClick = (e) => {
    setLoading(true);
    e.preventDefault();
    //wait for 3 secs before navigating
    setTimeout(() => {
      setLoading(false);
      navigate('/checkout'); // navigate to checkout page
    }, 3000)
  };

  // Improve 10/24/2024
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div
        className={`fixed h-full right-0 top-0 w-[80%] 800px:w-[30%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm`}
      >
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={20}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Lottie options={defaultOptions} height={200} width={200} />
              <h5 className="p-2 px-4 rounded-full text-[14px] text-neutral-500 font-[500]">
                Cart is Empty!
              </h5>

              <button
                onClick={handleViewProducts}
                className={`${styles.button} w-[200px] mt-6 flex items-center gap-2`}
              >
                Shop Now
                <IoArrowForward />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div
                className={`${styles.noramlFlex} p-4 flex items-center gap-2`}
              >
                <IoBagHandleOutline size={25} color="#73bd3a" />
                <h5 className="text-[20px] font-[500] text-[#73bd3a]">
                  {cart && cart.length} Items
                </h5>
              </div>

              {/* cart Single Items */}
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout" onClick={handleCheckoutClick} className="cursor-pointer">
                <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#73bd3a] rounded-sm`}>
                  {loading ? (
                    <Lottie options={defaultOptionTwo} height={45} width={45} />
                  ) : (
                    <h1 className="text-[#fff] text-[18px]">
                      Checkout Now{" "}
                      <span className="text-[#000] font-[700] ml-[10px]">
                        ₱{totalPrice.toFixed(2)}
                      </span>
                    </h1>
                  )}
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Out of Stock");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4 px-8 shadow-md">
      <div className="w-full flex items-center gap-2 relative">
        <div className="flex flex-col items-center">
          <div
            className={`bg-[#73bd3a] rounded-full w-[20px] h-[20px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={15} color="white" />
          </div>
          <span className="py-1">{data.qty}</span>
          <div
            className="bg-[#73bd3a] rounded-full w-[20px] h-[20px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiMinus size={15} color="white" />
          </div>
        </div>
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[130px] h-min rounded-[5px]"
        />
        <div className="flex flex-col items-start">
          <h1 className="w-[280px]" title={data.name}>
            {data.name}
          </h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ₱{data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[16px] pt-[3px] text-[#d02222] font-Roboto">
            Total Amount: ₱{totalPrice}
          </h4>
        </div>
        <RxCrossCircled
          size={22}
          className="cursor-pointer absolute -right-4 top-2"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
