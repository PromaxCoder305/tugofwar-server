const express = require("express");
const { addVideo, getVideos } = require("../controls/videocontrol");

const router = express.Router();

// Route to add a YouTube video link
router.post("/add", addVideo);

// Route to get all YouTube video links
router.get("/all", getVideos);

module.exports = router;
