import React from "react";
import styles from "../../styles/styles";
import { assets } from '../../Assests/assets'

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl shadow-inner overflow-hidden`}
    >
      <div className="marquee-container">
        <div className="branding flex justify-between w-full items-center">
          <div className="flex items-start">
            <img
              src={assets.comp_logo}
              alt=""
              style={{width:"150px", objectFit:"contain"}}
            />
          </div>
          <div className="flex items-start">
            <img
              src={assets.purefoods_logo}
              style={{width:"150px", objectFit:"contain"}}
              alt=""
            />
          </div>
          <div className="flex items-start">
            <img
              src={assets.sanmiguel_logo}
              style={{width:"150px", objectFit:"contain"}}
              alt=""
            />
          </div>
          <div className="flex items-start">
            <img
              src={assets.virginia_logo}
              style={{width:"150px", objectFit:"contain"}}
              alt=""
            />
          </div>
          <div className="flex items-start">
            <img
              src={assets.tide_logo}
              style={{width:"150px", objectFit:"contain"}}
              alt=""
            />
          </div>
          <div className="flex items-start">
            <img
              src={assets.nestle_logo}
              style={{width:"150px", objectFit:"contain"}}
              alt=""
            />
          </div>
          <div className="flex items-start">
            <img
              src={assets.head_n_shoulder}
              style={{width:"150px", objectFit:"contain"}}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
