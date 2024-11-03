import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts?.length) {
      const sortedData = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
      setData(sortedData.slice(0, 5));
    }
  }, [allProducts]);

  // Improve 10/21/2024
  return (
    <div className="overflow-hidden">
      <div className={`${styles.heading} w-11/12 mx-auto`}>
        <h1>Best Deals</h1>
      </div>
      <div className={`${styles.section} marquee-container-right`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data.length ? (
            data.map((product, index) => <ProductCard data={product} key={index} />)
          ) : (
            <p className="text-neutral-500 pl-2">No Best Deals Found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
