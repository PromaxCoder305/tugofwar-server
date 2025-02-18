const Comment = require("../models/commentmodel");

exports.getComments = async (req, res) => {
  const contentId = req.params.contentId;
  try {
    // Fetch comments for a particular contentId, sorted by most recent first
    const comments = await Comment.find({ contentId })
      .sort({ createdAt: -1 })  // Sort by creation date (newest first)
      .limit(10);  // Limit to 10 comments

    res.json(comments);  // Return comments in response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { contentId, user, comment } = req.body;  // Expecting these fields from request body

    if (!contentId || !user || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComment = new Comment({
      contentId,
      user: user || "Anonymous",  // Default to "Anonymous" if no user provided
      comment,
    });

    await newComment.save();  // Save the new comment to the database

    res.status(201).json(newComment);  // Return the saved comment in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
