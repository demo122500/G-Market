import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineHeart,
  AiOutlineQuestionCircle,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineTwitter,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import { assets } from '../../Assests/assets'
import { IoBagOutline, IoChevronDown, IoGlobeOutline, IoHeartOutline, IoNotifications } from "react-icons/io5";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || "All Categories");
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    setFadeClass("fade-in fade-in-active");
  }, []);

  useEffect(() => {
    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    }
  }, [])

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchData([]);
    } else {

    const filteredProducts = allProducts?.filter((product) => 
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
    }
  };

  window.addEventListener("scroll", () => {
    setActive(window.scrollY > 70);
  });

  return (
    <>
      <div className={`${styles.section} ${fadeClass}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between gap-8">
          <div>
            <Link to="/">
              <img
                src={assets.g_market_logo}
                alt=""
                className="w-[150px] p-2 object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-[#73bd3a]">Follow us on</p>
            <div className="flex items-center gap-2">
              <AiFillFacebook
                size={20}
                color="#73bd3a"
                className="cursor-pointer"
              />
              <AiOutlineTwitter
                size={20}
                color="#73bd3a"
                className="cursor-pointer"
              />
              <AiFillInstagram
                size={20}
                color="#73bd3a"
                className="cursor-pointer"
              />
              <AiFillYoutube
                size={20}
                color="#73bd3a"
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* search box */}
          <div className="w-[40%] relative ">
            <input
              type="text"
              placeholder="Search for Products, Brands and Shops"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-4 border-[#73bd3a] border-[1px] rounded-md"
            />
            <AiOutlineSearch
              size={25}
              className="absolute right-2 top-2 cursor-pointer"
              color="#73bd3a"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute w-full min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div key={index} className="w-full flex items-start-py-3">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/page-not-found">
              <div className="flex items-center gap-2 border border-[#F6F6F5] hover:border hover:border-[#73bd3a] hover:rounded-sm p-2">
                <IoNotifications color="#73bd3a" />
                <p className="text-[#73bd3a]">Notifications</p>
              </div>
            </Link>
            <Link to="/page-not-found">
              <div className="flex items-center gap-2 border border-[#F6F6F5] hover:border hover:border-[#73bd3a] hover:rounded-sm p-2">
                <AiOutlineQuestionCircle color="#73bd3a"/>
                <p className="text-[#73bd3a]">Help</p>
              </div>
            </Link>
            <Link to="/page-not-found">
              <div className="flex items-center gap-2 border border-[#F6F6F5] hover:border hover:border-[#73bd3a] hover:rounded-sm p-2">
                <IoGlobeOutline color="#73bd3a"/>
                <p className="text-[#73bd3a]">English</p>
                <IoChevronDown color="#73bd3a"/>
              </div>
            </Link>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <div className={`${styles.button}`}>
                <h1 className="text-[#fff] flex items-center">
                  {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition-all hidden 800px:flex items-center justify-between w-full bg-[#73bd3a] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between bg-[#73bd3a]`}
        >
          {/* categories (Improve 10/23/2024) */}
          <div onClick={() => setDropDown(true)} onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={25} className="absolute top-3 left-2" />
              <div
                className={`h-[80%] flex w-full justify-between rounded-md items-center px-10 bg-white shadow-2xl font-sans font-[500] select-none cursor-pointer`}
              >
                <h1 className="w-full truncate text-[#73bd3a]" title={selectedCategory}>
                  {selectedCategory || "All Categories"}
                </h1>
              </div>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {/* Dropdown animation */}
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                  setSelectedCategory={setSelectedCategory}
                />
              )}
            </div>
          </div>

          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <IoHeartOutline size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute left-5 top-0 rounded-full bg-[#000] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => {
                  setOpenCart(true);
                }}
              >
                <IoBagOutline
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute left-5 top-0 rounded-full bg-[#000] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={assets.comp_logo}
                alt=""
                className="mt-1 w-[100px] cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0]?.url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
