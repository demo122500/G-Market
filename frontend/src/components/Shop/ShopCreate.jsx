import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { assets } from "../../Assests/assets";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import animationData from "../../Assests/animations/button_loader.json";
import Lottie from "react-lottie";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(`${server}/shop/create-shop`, {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setZipCode();
        setAddress("");
        setPhoneNumber();
      });

    setTimeout(() => {
      setIsLoading(false);
      navigate("/shop-login");
    }, 3000).catch((error) => {
      toast.error(error.response.data.message);
      setIsLoading(false);
    });
  };

  // Lottie animations
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  // Improve 10/25/2024 added a button loading animation
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(121deg, rgba(115, 189, 58, 0.30) 0%, rgba(115, 189, 58, 0.60) 46%, rgba(115, 189, 58, 0.90) 100%), url(${assets.g_large})`,
      }}
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <Link to="/">
        <img
          src={assets.g_market_logo}
          alt=""
          className="absolute top-5 w-[150px] hover:scale-[1.1] transition-[0.3s] cursor-pointer"
        />
      </Link>
      <div className="flex items-center justify-center gap-20 sm:mx-auto sm:w-full">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-5xl text-[#333] font-extrabold">Welcome to</h2>
            <img
              style={{ filter: "drop-shadow(15px 8px 4px #f1f1f1)" }}
              className="w-[150px]"
              src={assets.g_market_logo}
              alt="logo"
            />
          </div>
          <p className="w-[500px] text-3xl text-neutral-700">
            We'd love for you to join our thriving multivendor marketplace!
            Expand your reach and connect with a wider audience of potential
            customers.{" "}
          </p>
          <br />
          <p className="text-3xl text-neutral-700">
            Thank you for choosing us!
          </p>
          <div className="flex items-center mt-10">
            <AiFillFacebook size={30} className="cursor-pointer" color="#333" />
            <AiOutlineTwitter
              size={30}
              color="#333"
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={30}
              color="#333"
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={30}
              color="#333"
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="bg-white/5 border-[#73bd3a]/90 shadow-2xl py-6 px-4 sm:rounded-xl sm:px-8">
          <div className="flex items-center justify-between sm:mx-auto sm:w-full sm:max-w-md mb-4">
            <img className="w-[120px]" src={assets.g_market_logo} alt="" />
            <h2 className="text-left text-2xl font-extrabold text-[#333]">
              Create Shop
            </h2>
          </div>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex gap-[20px]">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Shop Name
                </label>
                <div className="mt-1">
                  <input
                    type="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none bg-transparent block w-full border border-[#73bd3a]/50 px-3 py-2 shadow-md rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-[#73bd3a] sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="phone-number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="appearance-none bg-transparent block w-full px-3 py-2 border border-[#73bd3a]/50 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-[#73bd3a] sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none bg-transparent block w-full px-3 py-2 border border-[#73bd3a]/50 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-[#73bd3a] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="address"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none bg-transparent block w-full px-3 py-2 border border-[#73bd3a]/50 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-[#73bd3a] sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <div className="w-[50%]">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Zip Code
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="zipcode"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="appearance-none bg-transparent block w-full px-3 py-2 border border-[#73bd3a]/50 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-[#73bd3a] sm:text-sm"
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none bg-transparent block w-full px-3 py-2 border border-[#73bd3a]/50 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-[#73bd3a] sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={20}
                      style={{ color: "#333" }}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={20}
                      style={{ color: "#333" }}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 rounded-md shadow-md text-sm font-medium text-gray-700 bg-[#73bd3a]/90 hover:bg-[#73bd3a]"
                >
                  <span className="cursor-pointer text-[#000]">
                    Upload Profile
                  </span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#000] bg-[#73bd3a] hover:bg-[#73bd3a]/90"
              >
                {isLoading ? (
                  <Lottie options={defaultOptions} height={40} width={40} />
                ) : (
                  "Create Shop"
                )}
              </button>
            </div>
            <div
              className={`${styles.noramlFlex} flex items-center justify-center text-sm w-full text-neutral-700`}
            >
              <h4>Already have an account?</h4>
              <Link
                to="/shop-login"
                className="text-black hover:text-neutral-700"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
