import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";
import { assets } from "../../../Assests/assets.js";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  //sync wishlist state with component's click state
  useEffect(() => {
    setClick(wishlist.some((item) => item._id === data._id));
  }, [wishlist, data._id]);

  //remove from wishlist
  const removeFromWishlistHandler = (product) => {
    setClick(false);
    dispatch(removeFromWishlist(product));
  };

  //add to wishlist
  const addToWishlistHandler = (product) => {
    setClick(true);
    dispatch(addToWishlist(product));
  };

  //add to cart function
  const addToCartHandler = (id) => {
    const isItemExists = cart?.some((item) => item._id === id);
    if (isItemExists) {
      toast.error("Item already in the cart");
    } else if (data.stock < 1) {
      toast.error("Out of Stock");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully");
    }
  };

  // Improve 10/21/2024
  return (
    <div
      className="w-full h-[380px] rounded-lg shadow-2xl p-8 relative cursor-pointer"
      style={{
        backgroundImage: `url(${assets.product_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100",
      }}
    >
      <Link
        to={`${
          isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
        }`}
      >
        <img
          //src={`${data.images && data.images[0]?.url}`}
          src={data.images?.[0]?.url || assets.g_logo}
          alt={data.name || "Product"}
          className="w-full h-[170px] object-contain hover:scale-[1.1] transition-[0.3s]"
        />
      </Link>
      <Link
        className="flex items-start justify-start"
        to={`/shop/preview/${data?.shop._id}`}
      >
        <h5 className={`${styles.shop_name} bg-[#73bd3a]/20 px-4 rounded-full`}>
          {data.shop.name}
        </h5>
      </Link>
      <Link
        to={`${
          isEvent === true
            ? `/product/${data._id}?isEvent=true`
            : `/product/${data._id}`
        }`}
      >
        <h4 className="pb-4 font-[500] truncate" title={data.name}>
          {data.name}
        </h4>

        <div className="flex">
          <Ratings rating={data?.ratings} />
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              $
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
            </h5>
            <h4 className={`${styles.price}`}>
              ${data.originalPrice ? data.originalPrice : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {data?.sold_out || 0} sold
          </span>
        </div>
      </Link>

      {/* side options */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-4 top-5"
            onClick={() => removeFromWishlistHandler(data)}
            color={click ? "red" : "#333"}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-4 top-5"
            onClick={() => addToWishlistHandler(data)}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-4 top-14"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-4 top-24"
          onClick={() => addToCartHandler(data._id)}
          color="#444"
          title="Add to cart"
        />
        {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
      </div>
    </div>
  );
};

export default ProductCard;
