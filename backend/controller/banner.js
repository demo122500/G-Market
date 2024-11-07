const express = require("express");
const router = express.Router();
const Banner = require("../model/banner"); // Assume you create a Banner model
const cloudinary = require("cloudinary").v2;

// Create banner with Cloudinary image upload
router.post("/create", async (req, res) => {
  try {
    const { image, name, license, description, duration, link } = req.body;

    if (!image || !name) {
      return res
        .status(400)
        .json({ success: false, message: "Image and name are required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "banners",
    });

    // Create a new banner with the Cloudinary image URL
    const newBanner = new Banner({
      imageUrl: result.secure_url,
      name,
      description,
      duration,
      license,
      link,
      public_id: result.public_id,
    });

    await newBanner.save();

    res.status(201).json({
      success: true,
      message: "Banner created successfully!",
      banner: newBanner,
    });
  } catch (error) {
    console.error("Error creating banner:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all banners
router.get("/get-banners", async (req, res, next) => {
  try {
    const banners = await Banner.find(); // Retrieves all banners
    res.status(200).json({
      success: true,
      banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//delete banners
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // find banner by ID
    const banner = await Banner.findById(id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    // delete the image from cloudinary using public_id
    if (banner.public_id) {
      await cloudinary.uploader.destroy(banner.public_id);
    }

    // Delete the banner document from the database
    await Banner.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully!",
    });
  } catch (error) {
    console.log("Error deleting banner:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
