import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown, setSelectedCategory }) => {
  const navigate = useNavigate();
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    setTimeout(() => setMaxHeight("600px"), 10); // Start expanding after component mounts
  }, []);

  const submitHandle = (i) => {
    if (i.title === "All Categories") {
      localStorage.setItem("selectedCategory", "All Categories");
      navigate(`/products`);
    } else {
      localStorage.setItem("selectedCategory", i.title);
      navigate(`/products?category=${i.title}`);
    }
    setSelectedCategory(i.title);
    setDropDown(false);
    window.location.reload();
  };

  // Improve 10/23/2024
  return (
    <div
      className="pb-4 pt-4 w-[270px] bg-white shadow-2xl absolute top-10 z-30 rounded-b-md overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight }} // Apply the maxHeight state to smoothly expand
    >
      <div
        className={`${styles.noramlFlex} hover:bg-[#ccc] cursor-pointer`}
        onClick={() => submitHandle({ title: "All Categories" })}
      >
        <h3 className="m-3 select-none truncate">All Categories</h3>
      </div>
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex} hover:bg-neutral-200 cursor-pointer`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <h3 className="m-3 select-none truncate" title={i.title}>
              {i.title}
            </h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
