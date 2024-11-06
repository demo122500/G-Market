import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import animationData from "../../Assests/animations/button_loader.json";
import Lottie from "react-lottie";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation
    const name = couponCode;

    try {
      const res = await axios.get(`${server}/coupon/get-coupon-value/${name}`);
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;

      if (res.data.couponCode !== null) {
        const isCouponValid = cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
        }
      } else {
        toast.error("Coupon code doesn't exist.");
      }
    } catch (error) {
      toast.error("Error applying coupon code");
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Stop loading animation after response
      }, 3000);
      setCouponCode(""); // Clear coupon code input
    }
  };

  // applyCoupon button loading animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const discountPercentenge = couponCodeData ? discountPrice.toFixed(2) : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  console.log(discountPercentenge);

  // Improve 10/25/2024 added button loading animation
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
            isLoading={isLoading}
            defaultOptions={defaultOptions}
          />
        </div>
      </div>
      <div
        className={`${styles.button} rounded-[2px] mr-[53.5%] w-[150px] 800px:w-[275px] mt-5`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Pay Now</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full 800px:w-[95%] rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-4">
          <div className="w-[50%]">
            <input
              type="text"
              value={user && user.name}
              required
              placeholder="Full Name"
              className={`${styles.input} !w-[95%] p-[10px] border-[#ccc]`}
            />
          </div>
          <div className="w-[50%]">
            <input
              type="email"
              value={user && user.email}
              placeholder="Email"
              required
              className={`${styles.input} p-[10px] border-[#ccc]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-4">
          <div className="w-[50%]">
            <input
              type="number"
              required
              placeholder="Phone Number"
              value={user && user.phoneNumber}
              className={`${styles.input} !w-[95%] p-[10px] border-[#ccc]`}
            />
          </div>
          <div className="w-[50%]">
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              placeholder="Zip Code"
              className={`${styles.input} p-[10px] border-[#ccc]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-4">
          <div className="w-[50%]">
            <select
              className="w-[95%] border h-[45px] rounded-[5px] p-[10px] border-[#ccc]"
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <select
              className="w-[100%] border h-[45px] rounded-[5px] p-[10px] border-[#ccc]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block" value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-4">
          <div className="w-[50%]">
            <input
              type="address"
              required
              value={address1}
              placeholder="Address 1"
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} !w-[95%] p-[10px] border-[#ccc]`}
            />
          </div>
          <div className="w-[50%]">
            <input
              type="address"
              value={address2}
              placeholder="Address 2"
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`${styles.input} p-[10px] border-[#ccc]`}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        style={{ textDecoration: "underline" }}
        className="text-[18px] cursor-pointer inline-block text-[#333] hover:text-[#000]"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose saved address
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setAddress2(item.address2) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
  defaultOptions,
  isLoading,
}) => {
  return (
    <div className="w-full rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal</h3>
        <h5 className="text-[18px] font-[600]">₱{subTotalPrice.toFixed()}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping</h3>
        <h5 className="text-[18px] font-[600]">₱{shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b border-[#333] pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentenge ? "₱" + discountPercentenge.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-[#ff0000] text-end pt-3">
        ₱{totalPrice}
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[45px] p-[10px] border-[#ccc]`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <button
          className={`w-full flex items-center justify-center h-[40px] border border-[#73bd3a] text-center bg-[#73bd3a] text-white rounded-[3px] mt-4 cursor-pointer`}
          type="submit"
        >
          {isLoading ? (
            <Lottie options={defaultOptions} height={40} width={40} />
          ) : (
            "Apply Coupon"
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
