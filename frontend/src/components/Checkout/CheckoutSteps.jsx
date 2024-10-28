import React from "react";
import styles from "../../styles/styles";

const CheckoutSteps = ({ active }) => {
  console.log(active);
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] 800px:w-[50%] flex items-center justify-center flex-wrap">
        <div className={`${styles.noramlFlex}`}>
          <div className={`${styles.cart_button} !bg-[#73bd3a]`}>
            <span className={`${styles.cart_button_text}`}>Shipping</span>
          </div>
          <div
            className={`${
              active > 1
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#73bd3a]"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#73bd3a]/20"
            }`}
          />
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active > 1
                ? `${styles.cart_button} !bg-[#73bd3a]`
                : `${styles.cart_button} !bg-[#73bd3a]/20`
            }`}
          >
            <span
              className={`${
                active > 1
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#73bd3a]`
              }`}
            >
              Payment
            </span>
          </div>
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active > 3
                ? "w-[30px] 800px:w-[70px] h-[4px]"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#73bd3a]/20"
            }`}
          />
          <div
            className={`${
              active > 2
                ? `${styles.cart_button} !bg-[#73bd3a]`
                : `${styles.cart_button} !bg-[#73bd3a]/20`
            }`}
          >
            <span
              className={`${
                active > 2
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#73bd3a]`
              }`}
            >
              Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
