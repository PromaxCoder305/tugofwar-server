const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  description: { type: String, required: true },
  district: { type: String, required: true },
  date: { type: Date,default: Date.now, required: true },
  image: { type: String }, 
  youtubeLink: { type: String },
},{timestamps:true});

module.exports = mongoose.model('Content', contentSchema);
