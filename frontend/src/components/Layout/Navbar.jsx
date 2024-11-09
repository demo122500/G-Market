import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems.map((i, index) => (
        <div key={index} className="flex">
          <Link
            to={i.url}
            className={`pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer ${
              active === index + 1 ? "text-[#000000]" : "text-black 800px:text-[#fff]"
            }`}
          >
            {i.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
