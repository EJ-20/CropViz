const CropNode = require("../models/CropNode");

const getAllCropNodes = async (req, res) => {
  try {
    const data = await CropNode.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getByCrop = async (req, res) => {
  try {
    const crop = req.params.name;
    const nodes = await CropNode.find({ "crops.name": crop });
    res.json(nodes);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch crop nodes" });
  }
};

module.exports = { getAllCropNodes, getByCrop };
