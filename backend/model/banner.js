const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String, // Optional, in case you want the banner to link to something
  },
  public_id: {
    type: String,
    required: true,
  },
  // Any other banner-related fields
});

module.exports = mongoose.model("Banner", bannerSchema);
