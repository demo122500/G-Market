import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { BiMenuAltLeft } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import AboutNavbar from "./Navbar";
import { assets } from "../../Assests/assets";

const CareerHeader = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
		const onScroll = () => setIsActive(window.scrollY > 70);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`${
          isActive ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition-all hidden 800px:flex items-center justify-between w-full bg-[#73bd3a] h-[70px]`}
      >
        <div className={`${styles.section} ${styles.noramlFlex} justify-between`}>
          <Link to="/career">
            <div className="flex items-center gap-2">
              <img src={assets.g_logo_white} alt="Logo" className="w-12 h-12" />
              <h2 className="text-2xl font-semibold text-white">Market Careers</h2>
            </div>
          </Link>
          <AboutNavbar active={activeHeading} />
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          isActive === true ? "shadow-sm fixed top-0 left-0 z-10" : null
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
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="relative w-full justify-between flex pr-3 py-2">
                <RxCross1
                  size={20}
                  className="absolute right-2 top-2"
                  onClick={() => setOpen(false)}
                />
              </div>

              <AboutNavbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>

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

export default CareerHeader;
