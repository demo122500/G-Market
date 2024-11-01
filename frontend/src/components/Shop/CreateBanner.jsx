import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import styles from '../../styles/styles';

const CreateBanner = () => {
  const [banner, setBanner] = useState("");  // To store base64 image
  const [name, setName] = useState("");      // To store banner name
  const navigate = useNavigate();

  // Handle image file selection and preview
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBanner(reader.result); // Set the base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v2/banner/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: banner, name }),  // Include both name and image
      });

      if (!response.ok) throw new Error("Failed to upload banner");

      console.log("Banner uploaded successfully!");
      navigate("/dashboard-all-banners");  // Redirect after successful upload
    } catch (error) {
      console.error("Error uploading banner:", error);
    }
  };

  return (
    <div className='bg-white flex flex-col items-center rounded-2xl p-4 gap-12 py-8 w-[580px] h-full'>
      <h2 className='text-2xl text-black font-semibold'>Create Banner</h2>
      <div className='px-12 flex flex-col items-start w-full'>
        <div className='flex flex-col items-start w-full gap-2 mb-6'>
          {/* Name Input */}
          <label htmlFor="name">Enter your banner name <span className='text-red-500'>*</span></label>
          <input 
            type="text" 
            placeholder="Enter banner name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className='p-2 border rounded w-full'
          />
        </div>

        {/* Hidden File Input with Label Trigger */}
        <label htmlFor=''>Upload Banner <span className='text-red-500'>*</span></label>
        <input
          type="file"
          id="upload"
          className="hidden"
          onChange={handleBannerUpload}
        />
        <label htmlFor="upload">
          <AiOutlinePlusCircle size={30} className="cursor-pointer mt-3" color="#555" />
        </label>

        {/* Preview Selected Image */}
        {banner && (
          <img
            src={banner}
            alt="Selected preview"
            className="self-center h-[180px] w-[160px] object-contain m-2 rounded"
          />
        )}

        {/* Submit Button */}
        <button className={`${styles.button}`} onClick={handleSubmit}>Upload Banner</button>
      </div>
    </div>
  );
};

export default CreateBanner;
