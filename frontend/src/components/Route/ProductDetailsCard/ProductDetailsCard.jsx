import React, { useEffect, useState } from "react";
import {
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "../../../styles/styles";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { server } from "../../../server";
import { IoCloseCircleOutline, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoIosInformationCircleOutline } from "react-icons/io";

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

      const { data: res } = await axios.post(
        `${server}/conversation/create-new-conversation`,
        {
          groupTitle,
          userId,
          sellerId,
        }
      );
      navigate(`/inbox?${res.conversation._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const adjustCount = (type) => {
    setCount((prev) =>
      type === "increment" ? prev + 1 : Math.max(1, prev - 1)
    );
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
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="w-full h-[60vh] 800px:w-[60%] backdrop-blur-lg bg-[#73bd3a]/20 rounded-md shadow-2xl p-4 relative">
        <IoCloseCircleOutline
          size={30}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setOpen(false)}
          color="white"
        />

        <div className="800px:flex flex w-full h-full p-4">
          {/* Product Image and Seller Info */}
          <div className="relative w-full 800px:w-[50%] flex flex-col items-center mt-4">
            <img
              className="w-[340px] h-[340px] object-contain"
              src={data.images?.[0]?.url}
              alt={data.name}
            />

            <div className="absolute bottom-0 flex flex-col items-start self-start gap-4">
              <Link
                to={`/shop/preview/${data.shop._id}`}
                className="flex items-center"
              >
                <img
                  src={data.shop.avatar?.url || data.images?.[0]?.url}
                  alt={data.shop.name}
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div className="relatve left-0">
                  <h3 className="text-xl text-[#73bd3a] font-semibold">
                    {data.shop.name}
                  </h3>
                  <h5 className="text-[15px]">
                    {data.ratings?.toFixed(2) || 0} Ratings
                  </h5>
                </div>
              </Link>

              <button
                className="flex  items-center p-2 px-4 rounded-md bg-[#73bd3a] hover:bg-[#73bd3a]/80"
                onClick={handleMessageSubmit}
              >
                <AiOutlineMessage className="mr-2" />
                Send Message
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="relative w-full 800px:w-[50%] p-2 flex flex-col items-start gap-6">
            <h1
              className={`${styles.productTitle} text-2xl truncate-two-lines`}
            >
              {data.name}
            </h1>
            <p className="text-justify truncate-seven-lines">
              {data.description}
            </p>

            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4">
                <h4 className="text-2xl font-semibold">
                  ₱ <span className="text-[22px]">{data.discountPrice}</span>
                </h4>
                {data.originalPrice && (
                  <h3 className="line-through mb-2 text-red-500">
                    ₱ <span className="text-[14px]">{data.originalPrice}</span>
                  </h3>
                )}
              </div>

              <h5 className="text-[#ccc] font-semibold">
                {data.sold_out} Sold
              </h5>
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-4 rounded-md border-green-500">
                <button
                  onClick={() => adjustCount("decrement")}
                  className="bg-[#73bd3a] rounded-l-md p-2 text-lg font-bold"
                >
                  <HiMinus color="white" />
                </button>
                <p>{count}</p>
                <button
                  onClick={() => adjustCount("increment")}
                  className="bg-[#73bd3a] rounded-r-md p-2 text-lg font-bold"
                >
                  <HiPlus color="white" />
                </button>
              </div>

              <div onClick={toggleWishlistHandler}>
                {isWishlisted ? (
                  <IoHeartSharp
                    size={30}
                    color="red"
                    className="cursor-pointer"
                  />
                ) : (
                  <IoHeartOutline size={30} className="cursor-pointer" />
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-4 p-2">
              <button
                className="w-full flex items-center justify-center gap-2 p-4 bg-[#73bd3a] hover:bg-[#73bd3a]/80 rounded-sm"
                onClick={addToCartHandler}
              >
                <AiOutlineShoppingCart />
                Add to Cart
              </button>

              <Link to={`/product/${data._id}`} className="w-full">
                <button className="w-full flex items-center justify-center gap-2 p-4 bg-[#73bd3a] hover:bg-[#73bd3a]/80 rounded-sm">
                  <IoIosInformationCircleOutline size={20} />
                  More Info
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
