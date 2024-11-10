import React from "react";
import { Link } from "react-router-dom";
import { aboutNavItems } from "../../static/data";
import styles from "../../styles/styles";

const CareerNavbar = ({ active }) => {
    return (
      <div className={`block 800px:${styles.noramlFlex}`}>
        {aboutNavItems &&
            aboutNavItems.map((item, index) => (
            <div key={index} className="flex">
                <Link
                to={item.url}
                className={`pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer ${
                    active === index + 1 ? "text-black" : "text-[#fff]"
                }`}
                >
                {item.title}
                </Link>
            </div>
            ))}
      </div>
    );
  };
  

export default CareerNavbar;
