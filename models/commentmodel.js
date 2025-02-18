const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  contentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Content' }, // Linking to a content document
  user: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
},{timestamps:true});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
