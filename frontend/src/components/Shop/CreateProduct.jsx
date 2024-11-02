import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
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

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, error, success]);

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
      newForm.set("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(
      createProduct({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images,
      })
    );
  };

  return (
    <div className="w-full bg-white shadow h-[88vh] pt-1 mt-4 mx-8 rounded-md p-8 overflow-y-scroll">
      <h5 className="text-3xl font-Poppins text-center my-8">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-8">
          {/* Product Name */}
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
              placeholder="Enter Product Name"
            />
          </div>

          {/* Product category */}
          <div className="w-full">
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border border-gray-300 px-4 p-4 rounded-md"
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

          {/* Tags */}
          <div className="w-full">
            <label className="pb-2">Tags</label>
            <input
              type="text"
              name="tags"
              value={tags}
              className="mt-2 appearance-none block w-full px-4 p-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#73bd3a] focus:border-[#73bd3a] sm:text-sm"
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter Product Tags"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Orig price */}
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

          {/* Price eith discount */}
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

          {/* Product stock */}
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
              placeholder="Enter Product Stock"
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
            className="mt-2 appearance-none block w-full h-[165px] pt-2 px-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#73bd3a] focus:border-[#73bd3a] sm:text-sm resize-none"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Product Description"
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
            <input
              type="submit"
              value="Create Product"
              className="mt-2 cursor-pointer bg-[#73bd3a] hover:bg-[#73bd3a]/80 appearance-none text-center block w-full px-4 p-4 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
