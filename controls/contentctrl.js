const Content = require("../models/contentmodel");

const addContent = async (req, res) => {
  try {
    const { title,subTitle, description, district, date, youtubeLink } = req.body;
    const image = req.file ? req.file.filename : ""; // Store only the filename

    if (!title ||!subTitle || !description || !district || !date || !image) {
      return res.status(400).json({ error: "All fields are required ." });
    }

    const newContent = new Content({ title, subTitle,description, district, date, image, youtubeLink });
    await newContent.save();

    res.status(201).json({ message: "Content added successfully!", content: newContent });
  } catch (error) {
    console.error("Error adding content:", error);
    res.status(500).json({ error: "Failed to add content" });
  }
};

const getContentByDistrict = async (req, res) => {
  try {
    const { district } = req.params;
    const content = await Content.find({ district }).sort({ date: -1 });

    if (!content.length) {
      return res.status(404).json({ message: "No content found for this district" });
    }

    res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ error: "Failed to fetch content" });
  }
};
const getLatestContent = async (req, res) => {
  try {
    const content = await Content.find().sort({ createdAt: -1 }).limit(10); 
    res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching latest content:", error);
    res.status(500).json({ error: "Failed to fetch latest content" });
  }
};

const getContentbyId = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


module.exports = { addContent, getContentByDistrict, getLatestContent , getContentbyId };
