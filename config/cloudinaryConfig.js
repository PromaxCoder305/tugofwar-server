const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dqdpmbrej',
  api_key: '113532974751719',
  api_secret: 'YvwuQgko0HnHoXY9_h8VNQQGZuQ',
});
cloudinary.api.resources(
    { type: "upload", prefix: "uploads/" },
    (error, result) => {
      if (error) console.error("Error fetching images:", error);
      else console.log("Uploaded images:", result.resources);
    }
  );
module.exports = cloudinary;
