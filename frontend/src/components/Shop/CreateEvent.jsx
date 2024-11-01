import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate.toISOString.slice(
      0,
      10
    );
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, navigate, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    const data = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images,
      shopId: seller._id,
      start_Date: startDate?.toISOString(),
      Finish_Date: endDate?.toISOString(),
    };
    dispatch(createevent(data));
  };

  return (
    <div className="w-full bg-white shadow h-[88vh] pt-1 mt-4 mx-8 rounded-md p-8 overflow-y-scroll">
      <h5 className="text-3xl font-Poppins text-center my-8">Create Event</h5>
      {/* create event form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex items-center gap-8">
          {/* event name */}
          <div className="w-full">
            <label className="pb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              className="mt-2 appearance-none block w-full px-4 p-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#73bd3a] focus:border-[#73bd3a] sm:text-sm"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Event Name"
            />
          </div>

          {/* category */}
          <div className="w-full">
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border px-4 p-4 rounded-md border-gray-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Choose a category">Choose Category</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i.title} key={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>

          {/* tags */}
          <div className="w-full">
            <label className="pb-2">Tags</label>
            <input
              type="text"
              name="tags"
              value={tags}
              className="mt-2 appearance-none block w-full px-4 p-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#73bd3a] focus:border-[#73bd3a] sm:text-sm"
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter Event Tags"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* orig price */}
          <div className="w-full">
            <label className="pb-2">Original Price</label>
            <input
              type="number"
              name="price"
              value={originalPrice}
              className="mt-2 appearance-none block w-full px-4 p-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#73bd3a] focus:border-[#73bd3a] sm:text-sm"
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter Original Price"
            />
          </div>

          {/* discounted price */}
          <div className="w-full">
            <label className="pb-2">
              Price (With Discount) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={discountPrice}
              className="mt-2 appearance-none block w-full px-4 p-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#73bd3a] focus:border-[#73bd3a] sm:text-sm"
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Enter Discounted Price"
            />
          </div>

          {/* stock */}
          <div className="w-full">
            <label className="pb-2">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={stock}
              className="mt-2 appearance-none block w-full px-4 p-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#73bd3a] focus:border-[#73bd3a] sm:text-sm"
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter Event Product Stock"
            />
          </div>

          {/* start date */}
          <div className="w-full">
            <label className="pb-2">
              Event Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="price"
              id="start-date"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              className="mt-2 appearance-none block w-full px-4 p-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleStartDateChange}
              min={today}
              placeholder="Enter your event product stock..."
            />
          </div>

          {/* end date */}
          <div className="w-full">
            <label className="pb-2">
              Event End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="price"
              id="start-date"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              className="mt-2 appearance-none block w-full px-4 p-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleEndDateChange}
              min={minEndDate}
              placeholder="Enter your event product stock..."
            />
          </div>
        </div>

        {/* description */}
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Event Description"
          ></textarea>
        </div>

        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-4 cursor-pointer" color="#555" />
            </label>

            <div className="grid grid-cols-3 gap-4 mt-4 px-4">
              {/* Placeholder boxes that will display images if available */}
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="border shadow-inner border-gray-300 rounded-lg w-[130px] h-[130px] flex items-center justify-center"
                >
                  {images[index] ? (
                    <img
                      src={images[index]}
                      alt={`Uploaded preview ${index + 1}`}
                      className="h-[120px] w-[120px] object-contain m-2"
                    />
                  ) : (
                    <span className="text-gray-400 text-[12px]">Upload Image</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <br />
          <div>
            <button
              type="submit"
              className="mt-2 cursor-pointer appearance-none text-center bg-[#73bd3a] hover:bg-[#73bd3a]/80 block w-full px-4 p-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
