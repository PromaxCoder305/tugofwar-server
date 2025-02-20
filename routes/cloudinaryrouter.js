const express = require("express");
const cloudinary = require("../config/cloudinaryConfig"); // Cloudinary Config
const router = express.Router();

// Fetch latest images from Cloudinary
router.get("/get-latest-images", async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "uploads/", // Your Cloudinary folder
      max_results: 5, // Fetch latest 5 images
      sort_by: "created_at", // Sort by newest first
    });

    // Extract necessary details
    const images = result.resources.map((image) => ({
      url: image.secure_url,
      public_id: image.public_id,
    }));

    res.json({ images }); // Send to frontend
  } catch (error) {
    console.error("Error fetching latest images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

module.exports = router;
