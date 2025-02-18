const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  district: { type: String, required: true },
  youtubeLink: { type: String, required: true },
},{timestamps:true});

module.exports = mongoose.model("Video", VideoSchema);
