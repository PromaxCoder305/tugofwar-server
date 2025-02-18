const Video = require("../models/videomodel");

// ✅ Add a new YouTube video link
const addVideo = async (req, res) => {
  try {
    const { title, date, district, youtubeLink } = req.body;

    if (!title || !date || !district || !youtubeLink) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newVideo = new Video({ title, date, district, youtubeLink });
    await newVideo.save();

    res.status(201).json({ success: true, message: "Video added successfully" });
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get all YouTube video links
const getVideos = async (req, res) => {
  try {
    const youtubeLinks = await Video.find()
      .sort({ createdAt: -1 }) // Sort by latest date
      .select("youtubeLink title district date") // Only fetch required fields
      .limit(7); // Limit results to 7

    res.status(200).json(youtubeLinks);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { addVideo, getVideos };
