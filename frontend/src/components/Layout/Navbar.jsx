import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  const renderedNavItems = useMemo(() => {
    return navItems.map((item, index) => (
      <div key={index} className="flex">
        <Link
          to={item.url}
          className={`${active === index + 1 ? "text-[#000000]" : "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer`}
        >
          {item.title}
        </Link>
      </div>
    ));
  }, [active]);

  return <div className={`block 800px:${styles.noramlFlex}`}>{renderedNavItems}</div>;
};

export default Navbar;
