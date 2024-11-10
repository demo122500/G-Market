import React, { useEffect, useState } from "react";
import { assets } from "../../Assests/assets";
import { Link } from "react-router-dom";
import CareerHeader from "../../components/ShopCareer/Header";

const AboutUs = () => {
	const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    setFadeClass("fade-in fade-in-active");
  }, []);

  return (
    <>
      <CareerHeader activeHeading={2} className={`${fadeClass}`}/>

			<div className="w-full h-[50vh]">
				<img src={assets.gmarket_office} alt="office" className="w-full h-full object-cover"/>
			</div>

			<div className={`flex flex-col items-center py-12 gap-8 ${fadeClass}`}>
				<h2 className="text-black/90 text-3xl font-semibold">G-Market is the preeminent e-commerce platform in the Philippines.</h2>
				<p className="text-slate-500 text-lg max-w-3xl text-center">Launched in 2023, G-Market is a regional e-commerce platform dedicated to providing a seamless online shopping experience. We strive to make online shopping accessible, easy, and enjoyable for everyone.</p>
				<Link to="/">
					<button className="p-4 bg-[#73bd3a] px-8 rounded-full text-white hover:bg-[#73bd3a]/90">Explore G-Market</button>
				</Link>

				<div className="flex flex-col items-center justify-center gap-8 mt-8 w-[1000px]">
					<div className="flex items-center gap-8 mt-8">
						{/* purpose */}
						<div className="flex flex-col items-center gap-2 bg-[#fff] shadow-2xl p-8 rounded-lg">
							<h2 className="text-black/70 text-2xl font-semibold">Our Purpose</h2>
							<p className="text-slate-500 text-center text-base">We're passionate about using technology to connect people and revitalize local economies. Our platform simplifies buying and selling within communities.</p>
						</div>
						{/* positioning */}
						<div className="flex flex-col items-center gap-2 bg-[#fff] shadow-2xl p-8 rounded-lg">
							<h2 className="text-black/70 text-2xl font-semibold">Our Positioning</h2>
							<p className="text-slate-500 text-center text-base">G-Market empowers regional shoppers with a one-stop online destination, offering a diverse product range, an engaging community, and efficient delivery services.</p>
						</div>
					</div>

					{/* our way */}
					<div className="flex flex-col items-center gap-2 bg-[#fff] shadow-2xl p-6 rounded-lg">
						<h2 className="text-black/70 text-2xl font-semibold">Our Way</h2>
						<p className="text-slate-500 text-center text-base px-24">To define who we are - how we talk, behave or react to any given situation - in essence, we are Simple, Happy and Together. These key attributes are visible at every step of the Shopee journey.</p>
					</div>
				</div>
			</div>
    </>
  );
};

export default AboutUs;
