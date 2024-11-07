import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const [data,setData] = useState({});
  const {products} = useSelector((state) => state.products);
  const [isLoading,setIsLoading] = useState(false);
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
     setData(res.data.shop);
     setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    })
  }, [])
  
  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`,{
      withCredentials: true,
    });
    window.location.reload();
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings = products && products.reduce((acc,product) => acc + product.reviews.reduce((sum,review) => sum + review.rating, 0),0);

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
   <>
   {
    isLoading  ? (
      <Loader />
    ) : (
      <div className="relative flex flex-col gap-4 p-6 h-full">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center justify-center">
            <img
              src={`${data.avatar?.url}`}
              alt=""
              className="w-[150px] h-[150px] object-cover rounded-full"
            />
            <h3 className="text-center text-xl font-semibold">{data.name}</h3>
          </div>
          <p className="self-center text-[16px] text-[#000000a6] p-[10px]">
            {data.description}
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 p-2">
          <div>
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data.address}</h4>
          </div>
          <div>
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
          </div>
          <div>
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{products && products.length}</h4>
          </div>
          <div>
            <h5 className="font-[600]">Shop Ratings</h5>
            <h4 className="text-[#000000b0]">{averageRating}/5</h4>
          </div>
          <div>
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">{data?.createdAt?.slice(0, 10)}</h4>
          </div>
        </div>

        <div className="relative -bottom-28">
          {isOwner && (
            <div className="">
              <Link to="/settings">
              <div className={`${styles.button} w-full !h-[42px] !rounded-[5px]`}>
                <span className="text-white">Edit Shop</span>
              </div>
              </Link>
              <div className={`${styles.button} w-full !h-[42px] !rounded-[5px]`}
              onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
   }
   </>
  );
};

export default ShopInfo;
