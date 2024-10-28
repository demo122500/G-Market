import React, { useEffect, useState } from "react";
import { 
  AiFillHeart, 
  AiOutlineHeart, 
  AiOutlineMessage, 
  AiOutlineShoppingCart 
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "../../../styles/styles";
import { addTocart } from "../../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { server } from "../../../server";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(wishlist.some((item) => item._id === data?._id));
  }, [wishlist, data]);

  const handleMessageSubmit = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to start a conversation.");
      return;
    }
    try {
      const { _id: userId } = user;
      const { _id: sellerId } = data.shop;
      const groupTitle = `${data._id}${userId}`;

      const { data: res } = await axios.post(`${server}/conversation/create-new-conversation`, {
        groupTitle,
        userId,
        sellerId,
      });
      navigate(`/inbox?${res.conversation._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const adjustCount = (type) => {
    setCount((prev) => (type === "increment" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const addToCartHandler = () => {
    const isItemInCart = cart.some((item) => item._id === data._id);

    if (isItemInCart) {
      toast.error("Item already in cart.");
      return;
    }
    if (data.stock < count) {
      toast.error("Out of stock.");
      return;
    }
    const cartData = { ...data, qty: count };
    dispatch(addTocart(cartData));
    toast.success("Item added to cart successfully.");
  };

  const toggleWishlistHandler = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(data));
      toast.info("Removed from wishlist.");
    } else {
      dispatch(addToWishlist(data));
      toast.success("Added to wishlist.");
    }
    setIsWishlisted(!isWishlisted);
  };

  if (!data) return null;

  // Improve 10/21/2024
  return (
    <div className="bg-white fixed inset-0 z-40 flex items-center justify-center bg-opacity-30 shadow-2xl">
      <div className="w-[90%] 800px:w-[60%] h-[70vh] 800px:h-[62vh] overflow-y-scroll bg-white rounded-md shadow-sm p-4 relative">
        <RxCross1
          size={20}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setOpen(false)}
        />

        <div className="block 800px:flex">
          {/* Product Image and Seller Info */}
          <div className="w-full 800px:w-[50%]">
            <img src={data.images?.[0]?.url} alt={data.name} />

            <div className="flex items-center mt-4">
              <Link to={`/shop/preview/${data.shop._id}`} className="flex items-center">
                <img
                  src={data.shop.avatar?.url || data.images?.[0]?.url}
                  alt={data.shop.name}
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div>
                  <h3 className={styles.shop_name}>{data.shop.name}</h3>
                  <h5 className="text-[15px]">{data.ratings?.toFixed(2) || 0} Ratings</h5>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button
                className={`${styles.button} text-white h-11 rounded-md`}
                onClick={handleMessageSubmit}
              >
                <AiOutlineMessage className="mr-2" />
                Send Message
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full 800px:w-[50%] px-5 pt-5">
            <h1 className={`${styles.productTitle} text-[20px]`}>{data.name}</h1>
            <p className="mt-2">{data.description}</p>

            <div className="flex items-center pt-3">
              <h4 className={`${styles.productDiscountPrice}`}>{data.discountPrice}$</h4>
              {data.originalPrice && (
                <h3 className={`${styles.price} ml-2`}>{data.originalPrice}$</h3>
              )}
            </div>
            <h5 className="text-green-500 font-medium mt-1">
              {data.sold_out} Sold
            </h5>

            <div className="flex items-center mt-8 mb-8 justify-between">
              <div className="flex items-center">
                <button
                  className="bg-[#73bd3a] text-white px-4 py-2 rounded-l shadow hover:opacity-75"
                  onClick={() => adjustCount("decrement")}
                >
                  -
                </button>
                <span className="px-4 py-2 border border-[#73bd3a] text-gray-800">{count}</span>
                <button
                  className="bg-[#73bd3a] text-white px-4 py-2 rounded-r shadow hover:opacity-75"
                  onClick={() => adjustCount("increment")}
                >
                  +
                </button>
              </div>

              <div onClick={toggleWishlistHandler}>
                {isWishlisted ? (
                  <AiFillHeart size={30} color="red" className="cursor-pointer" />
                ) : (
                  <AiOutlineHeart size={30} className="cursor-pointer" />
                )}
              </div>
            </div>

            <button
              className={`${styles.button} w-full h-11 rounded-md mt-4 flex items-center justify-center`}
              onClick={addToCartHandler}
            >
              <AiOutlineShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
