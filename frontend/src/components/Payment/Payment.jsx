import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { assets } from '../../Assests/assets'

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymnentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
              setOpen(false);
              navigate("/order/success");
              toast.success("Order successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              window.location.reload();
            });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
    .post(`${server}/order/create-order`, order, config)
    .then((res) => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    });
  };

  // Improve 10/24/2024
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 cursor-pointer">
      {/* select buttons */}
      <div className="items-center justify-center flex flex-col gap-8">
        <div className="flex items-center w-full border-b pb-5">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <div className="flex items-center gap-[12px]">
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">Pay with</h4>
            <img className="w-[40px] h-[30px]" src={assets.card_icon} alt="" />
          </div>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="rounded-lg w-[45%] flex p-[20px] shadow-2xl">
            <form className="w-full justify-center items-center" onSubmit={paymentHandler}>
              <div className="flex items-center px-8 justify-around mb-[20px]">
                <img className="visa-icon w-[50px]" src={assets.visa_icon} alt="" />
                <img className="w-[50px]" src={assets.mastercard} alt="" />
                <img className="w-[50px]" src={assets.american_express} alt="" />
                <img className="w-[50px]" src={assets.discover} alt="" />
              </div>
              <div className="flex pb-3">
                <div className="w-full">
                  <label className="text-[#000] text-[12px] font-[900] block pb-2">CARD HOLDER NAME</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className={`${styles.input} !w-full bg-transparent text-[#444] p-[10px] shadow-inner`}
                    value={user && user.name}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[100%]">
                  <label className="block pb-2 text-[#000] text-[12px] font-[900]">CARD NUMBER</label>
                  <CardNumberElement
                    className={`${styles.input} !h-[45px] !w-[100%] p-[10px] shadow-inner`}
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-between gap-4 pb-3">
                <div className="w-full">
                  <label className="block pb-2 text-[#000] text-[12px] font-[900]">EXPIRATION DATE</label>
                  <CardExpiryElement
                    className={`${styles.input} !h-[45px] w-full p-[10px] shadow-inner`}
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                
                {/* CVC */}
                <div className="w-full">
                  <label className="block pb-2 text-[12px] text-[#000] font-[900]">CVC</label>
                  <CardCvcElement
                    className={`${styles.input} !h-[45px] p-[10px] shadow-inner`}
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Pay Now"
                className={`${styles.button} !bg-[#73bd3a] w-full text-[#fff] h-[45px] rounded-[2px] cursor-pointer text-[18px] font-[600] hover:!bg-[#73bd3a]/80`}
              />
            </form>
          </div>
        ) : null}
      </div>

      {/* paypal payment */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center w-full border-b">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <div className="flex items-center gap-[12px]">
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">Pay with</h4>
            <img className="w-[70px]" src={assets.paypal} alt="" />
          </div>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full items-center justify-center flex border-b">
            <div
              className={`${styles.button} !bg-[#73bd3a] hover:!bg-[#73bd3a]/80 text-white h-[45px] rounded-sm cursor-pointer text-[18px] font-[600] mb-10`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={20}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        onApprove={onApprove}
                        createOrder={createOrder}
                      />
                    </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* cash on delivery */}
      <div className="flex flex-col gap-4">
        <div className="flex w-full pb-5 pt-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full">
            <form className="w-full flex justify-center items-center" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#73bd3a] hover:!bg-[#73bd3a]/80 rounded-sm text-[#fff] h-[45px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal</h3>
        <h5 className="text-[16px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping</h3>
        <h5 className="text-[16px] font-[600]">${shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b border-[#ccc] pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount</h3>
        <h5 className="text-[16px] font-[600]">{orderData?.discountPrice? "$" + orderData.discountPrice.toFixed(2) : "-"}</h5>
      </div>
      <div className="flex justify-between items-center border-b border-[#ccc] pb-3 pt-3">
        <h5>Total</h5>
        <h5 className="text-[16px] font-[700] text-[#ff0000] text-end">
          ${orderData?.totalPrice}
        </h5>
      </div>
      <br />
    </div>
  );
};

export default Payment;
