// controllers/cropController.js
const CropNode = require("../models/CropNode");

exports.getAllCropNodes = async (req, res) => {
  try {
    const data = await CropNode.find({});
    res.json(data);
  } catch (err) {
    console.error("Error fetching crop nodes:", err);
    res.status(500).json({ error: "Server error" });
  }
};
