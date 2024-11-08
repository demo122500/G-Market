/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { formatDistanceToNowStrict, isToday, isYesterday } from "date-fns";
import UserInbox from "../../pages/UserInbox";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [dispatch, error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadUser());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="relative w-full flex flex-col items-center px-32 justify-center">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-2 right-2">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true} className="flex flex-col items-center gap-8">
              <div className="w-full 800px:flex items-center gap-8 block">
                <div className="w-full">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] p-4 800px:mb-0 text-slate-500`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] p-4 800px:mb-0 text-slate-500`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block items-center gap-8">
                <div className="w-full">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] p-4 800px:mb-0 text-slate-500`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] p-4 800px:mb-0 text-slate-500`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] p-4 self-start  bg-[#73bd3a] text-center rounded-md cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* message */}
      {active === 4 && (
        <div>
          <UserInbox />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div className="absolute top-0">
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div className="w-full">
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div className="w-full absolute top-0 px-32">
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { orders, loading: ordersLoading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  if (userLoading || ordersLoading) {
    return <div className="text-center p-6">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">Error: {error}</div>;
  }

  const categorizeOrders = (orders = []) => {
    const categories = {
      Today: [],
      Yesterday: [],
      "This Week": [],
      Older: [],
      Delivered: [],
    };

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      if (order.status === "Delivered") {
        categories.Delivered.push(order);
      } else if (isToday(orderDate)) {
        categories.Today.push(order);
      } else if (isYesterday(orderDate)) {
        categories.Yesterday.push(order);
      } else if (formatDistanceToNowStrict(orderDate).includes("day")) {
        categories["This Week"].push(order);
      } else {
        categories.Older.push(order);
      }
    });

    return categories;
  };

  const sortedOrders = [...(orders || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const categorizedOrders = categorizeOrders(sortedOrders);

  return (
    <div className="w-full p-6">
      {Object.entries(categorizedOrders).map(([category, ordersList]) => (
        category !== "Delivered" && ordersList.length > 0 && (
          <div key={category} className="mb-8">
            <h2 className="text-lg font-bold text-gray-700 mb-4">{category}</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {ordersList.map((order) => (
                <div key={order._id} className="p-6 rounded-lg shadow-lg border flex flex-col space-y-4 bg-white">
                  <div className="flex items-start space-x-6">
                    <img
                      src={order.cart[0]?.images[0]?.url || "https://via.placeholder.com/150"}
                      alt="Product"
                      className="w-28 h-28 object-cover rounded-lg"
                    />
                    <div className="flex flex-col space-y-1 text-gray-600">
                      <p className="text-sm text-gray-500">Order Date: <span className="text-[12px] font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                      <p className="text-sm">Status: <span className={`font-semibold ${order.status === "Delivered" ? "text-green-600" : "text-red-600"}`}>{order.status}</span></p>
                      <p className="text-sm">Items Qty: {order.cart.length}</p>
                      <p>Total: ₱{order.totalPrice}</p>
                    </div>
                  </div>
                  <div className="flex items-center pt-2 gap-2">
                    <button className="bg-[#73bd3a]/30 text-[12px] p-1 px-4 rounded-full">Best Selling</button>
                    <button className="bg-[#73bd3a]/30 text-[12px] p-1 px-4 rounded-full">Products</button>
                    <button className="bg-[#73bd3a]/30 text-[12px] p-1 px-4 rounded-full">Events</button>
                    <Link to={`/user/order/${order._id}`} className="flex items-center pl-2">
                      <AiOutlineArrowRight size={18} className="text-blue-500" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {categorizedOrders.Delivered?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Delivered</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {categorizedOrders.Delivered.map((order) => (
              <div key={order._id} className="p-6 rounded-lg shadow-lg border flex flex-col space-y-4 bg-white">
                <div className="flex items-start space-x-6">
                  <img
                    src={order.cart[0]?.images[0]?.url || "https://via.placeholder.com/150"}
                    alt="Product"
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                  <div className="flex flex-col space-y-1 text-gray-600">
                    <p className="text-sm text-gray-500">Order Date: <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                    <p className="text-sm">Status: <span className="font-semibold text-green-600">Delivered</span></p>
                    <p className="text-sm">Items Qty: {order.cart.length}</p>
                    <p>Total: ₱{order.totalPrice}</p>
                  </div>
                </div>
                <div className="flex items-center pt-2 gap-2">
                  <button className="bg-[#73bd3a]/30 text-[12px] p-1 px-4 rounded-full">Best Selling</button>
                  <button className="bg-[#73bd3a]/30 text-[12px] p-1 px-4 rounded-full">Products</button>
                  <button className="bg-[#73bd3a]/30 text-[12px] p-1 px-4 rounded-full">Events</button>
                  <Link to={`/user/order/${order._id}`} className="flex items-center pl-2">
                    <AiOutlineArrowRight size={18} className="text-blue-500" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  const eligibleOrders = orders?.filter((item) => item.status === "Processing refund");

  return (
    <div className="w-full p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800">Refund Orders</h2>

      {eligibleOrders?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {eligibleOrders.map((order) => (
            <div key={order._id} className="p-6 rounded-lg shadow-lg border bg-white flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={order.cart[0]?.images[0]?.url || "https://via.placeholder.com/150"}
                  alt="Product"
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div className="flex flex-col space-y-1 text-gray-600">
                  <p className="text-sm">Order ID: <span className="font-semibold">{order._id}</span></p>
                  <p className="text-sm text-gray-500">
                    Order Date: <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </p>
                  <p className="text-sm">
                    Status: <span className={`font-semibold ${order.status === "Delivered" ? "text-green-600" : "text-red-600"}`}>{order.status}</span>
                  </p>
                  <p className="text-sm">Items Qty: {order.cart.length}</p>
                  <p>Total: ₱{order.totalPrice}</p>
                </div>
              </div>
              <div className="flex items-center pt-2 gap-2">
                <button className="bg-[#73bd3a]/30 text-[12px] p-1 px-4 rounded-full">Best Selling</button>
                <button className="bg-[#73bd3a]/30 text-[12px] p-1 px-4 rounded-full">Products</button>
                <button className="bg-[#73bd3a]/30 text-[12px] p-1 px-4 rounded-full">Events</button>
                <Link to={`/user/order/${order._id}`} className="flex items-center pl-2">
                  <AiOutlineArrowRight size={18} className="text-blue-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No orders eligible for a refund found.</p>
      )}
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Track Your Orders</h2>

      {orders?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order._id} className="p-6 rounded-lg shadow-lg border bg-white flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={order.cart[0]?.images[0]?.url || "https://via.placeholder.com/150"}
                  alt="Product"
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div className="flex flex-col space-y-1 text-gray-600">
                  <p className="text-sm truncate" title={order._id}>Ref ID: <span className="font-semibold">{order._id}</span></p>
                  <p className="text-sm text-gray-500">
                    Order Date: <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </p>
                  <p className="text-sm">
                    Status: <span className={`font-semibold ${order.status === "Delivered" ? "text-green-600" : "text-red-600"}`}>{order.status}</span>
                  </p>
                  <p className="text-sm">Items Qty: {order.cart.length}</p>
                  <p>Total: ₱{order.totalPrice}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 gap-2">
                <Link to="/products">
                  <button className="bg-[#73bd3a]/30 text-[12px] p-1 px-4 rounded-full">Continue Shopping</button>
                </Link>
                <Link to={`/user/track/order/${order._id}`} className="flex items-center pl-2">
                  <MdTrackChanges size={18} className="text-blue-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You have no orders to track at the moment.</p>
      )}
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-6 py-6 flex flex-col items-center gap-4">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center gap-4 py-2"
        >
          <div className=" w-full 800px:w-[50%]">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 p-4`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%]">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 p-4`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%]">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 p-4`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className=" w-[100%] 800px:w-[50%]">
            <button
              className={`w-[95%] p-4 bg-[#73bd3a] text-center rounded-[3px] mt-8 cursor-pointer`}
              value="Update"
              type="submit"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};
export default ProfileContent;
