import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import { assets } from "../../../Assests/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import animationData from "../../../Assests/animations/button_loader.json";
import Lottie from "react-lottie";

const Hero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (prevRef.current && nextRef.current && swiperRef.current?.swiper) {
        const swiper = swiperRef.current.swiper;
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  //Apply now button animation
  const handleApplyNowClick = (e) => {
    setIsLoading(true);
    e.preventDefault();

    setTimeout(() => {
      setIsLoading(false);
      navigate("/page-not-found");
    }, 3000);
  };

  // Apply now button animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
      >
        <SwiperSlide>
          <div
            className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full ${styles.noramlFlex}`}
          >
            <img style={{ placeSelf: "start" }} src={assets.banner1} alt="" />
            {/* <div
              className={`${styles.section} absolute left-[70px] p-[16px] w-[auto] 800px:w-[60%]`}
            >
              <h1
                className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#fff] font-[900]`}
              >
                New Headset with <br /> Super Stereo Sound
              </h1>
              <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#ccc] w-[75%] mt-[16px] mb-[16px]">
                Ditch the tangled mess and unleash vibrant sound with our
                stunning blue wireless headphones. Combining crystal clear audio
                with the freedom of wireless technology, these headphones let
                you lose yourself in the music and express your unique style.
              </p>
              <Link to="/products" className="inline-block">
                <div
                  className={`${styles.button} bg-[#deec31] hover:bg-[#dfec318e] mt-5`}
                >
                  <span className="text-[#000] font-[600] font-[Poppins] text-[16px] cursor-pointer">
                    Shop Now
                  </span>
                </div>
              </Link>
            </div> */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full ${styles.noramlFlex}`}
          >
            <img style={{ placeSelf: "start" }} src={assets.banner2} alt="" />
            <div
              className={`${styles.section} absolute left-[70px] p-[16px] w-[auto] 800px:w-[60%]`}
            >
              <Link
                to="/products"
                className="absolute -top-28 left-5 w-[390px]"
              >
                <div
                  className={`${styles.button} bg-white/20 hover:bg-white/30 shadow-2xl rounded-none border border-white/50 w-full`}
                >
                  <span className="text-black font-[600] font-[Poppins] text-[16px] cursor-pointer">
                    Shop Now
                  </span>
                </div>
                <div className="absolute -top-2 border border-l-white/50 h-5 left-4"></div>
                <div className="absolute -top-2 border border-l-white/50 h-5 right-4"></div>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full ${styles.noramlFlex}`}
          >
            <img style={{ placeSelf: "start" }} src={assets.banner3} alt="" />
            <div
              className={`${styles.section} absolute left-[32%] top-[16%] p-[16px] w-[auto] 800px:w-[60%]`}
            >
              <div
                onClick={handleApplyNowClick}
                className={`${styles.button} bg-white/10 hover:bg-white/30 border border-white/80 mt-[200px]`}
              >
                {isLoading ? (
                  <Lottie options={defaultOptions} height={40} width={40} />
                ) : (
                  <span className="text-white font-[600] font-[Poppins] text-[16px] cursor-pointer">
                    Apply Now
                  </span>
                )}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="custom-navigation">
        <button ref={prevRef} className="swiper-button-prev"></button>
        <button ref={nextRef} className="swiper-button-next"></button>
      </div>
    </div>
  );
};

export default Hero;
