const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig"); // Import Cloudinary configuration

// Function to get current time in HH-MM-SS format
const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}-${minutes}-${seconds}`;
};

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Change to your desired Cloudinary folder
    format: async (req, file) => "png", // Convert all images to PNG (or keep original format)
    public_id: (req, file) => `${getCurrentTime()}-${file.originalname.split(".")[0]}`, // Filename based on time
  },
});

const uploads = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/jfif"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(new Error("Only image files are allowed"), false);
    } else {
      cb(null, true);
    }
  },
});

module.exports = uploads;
