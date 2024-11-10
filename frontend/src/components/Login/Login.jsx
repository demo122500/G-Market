import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { assets } from "../../Assests/assets";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import animationData from "../../Assests/animations/button_loader.json";
import Lottie from "react-lottie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");

        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
          window.location.reload(true);
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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

  // Improve 10/25/2024 added button loading animation
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(121deg, rgba(115, 189, 58, 0.30) 0%, rgba(115, 189, 58, 0.60) 46%, rgba(115, 189, 58, 0.90) 100%), url(${assets.g_large})`,
      }}
      className="min-h-screen bg-grey-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <Link to="/">
        <img
          src={assets.g_market_logo}
          alt=""
          className="absolute top-5 w-[150px] hover:scale-[1.1] transition-[0.3s] cursor-pointer"
        />
      </Link>
      <div className="flex items-center justify-center mt-8 sm:mx-auto sm:w-full gap-20">
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
        <div className="bg-white/5 py-6 px-4 shadow-2xl sm:rounded-lg sm:px-8 w-[380px]">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between sm:mx-auto sm:w-full sm:max-w-md">
              <img className="w-[120px]" src={assets.g_market_logo} alt="" />
              <h2 className="text-left text-2xl font-extrabold text-[#333]">
                Log in
              </h2>
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
                  className="appearance-none bg-transparent block w-full px-3 py-2 border border-[#73bd3a]/50 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-[#ccc] focus:border-[#73bd3a] sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={20}
                    color="#333"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={20}
                    color="#333"
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-[blue-600] focus:ring-[#73bd3a] border border-[#73bd3a] rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="block text-sm text-neutral-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="forgot-password"
                  className="font-sm text-black hover:text-neutral-700"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                disabled={isloading}
                type="submit"
                className="group relative w-full h-[40px] flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#000] bg-[#73bd3a] hover:bg-[#73bd3a]/80"
              >
                {isloading ? (
                  <Lottie options={defaultOptions} height={40} width={40} />
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <div
              className={`${styles.noramlFlex} w-full flex items-center justify-center`}
            >
              <h4 className="text-neutral-700 text-sm">Don't have account?</h4>
              <Link
                to="/sign-up"
                className="text-black text-sm hover:text-neutral-700"
              >
                Sign Up
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-neutral-700 text-sm">Or</p>
              <Link to="/shop-login" className="w-full">
                <button className={`${styles.button} w-full`}>
                  Continue as Seller
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
