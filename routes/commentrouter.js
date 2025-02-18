const express = require("express");
const router = express.Router();
const { getComments, addComment } = require("../controls/commentcontrol");

// Routes
router.get("/getcomments/:contentId", getComments);
router.post("/add", addComment);

module.exports = router;
