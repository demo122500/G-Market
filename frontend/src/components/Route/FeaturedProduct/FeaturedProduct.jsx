import React from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const {allProducts} = useSelector((state) => state.products);
  const featuredProducts = allProducts ? allProducts.slice(0, 20) : [];
   
  // Improve 10/21/2024
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product, index) => (
              <ProductCard data={product} key={index} />
            ))
          ) : (
            <p className="text-neutral-500 pl-2">No Featured Products Available!</p>
          )}
        {/* {
            allProducts && allProducts.length !== 0 &&(
              <>
               {allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
           } */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
