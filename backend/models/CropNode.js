// models/CropNode.js
const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  name: String,
  yield: { type: Map, of: Number }, 
});

const CropNodeSchema = new mongoose.Schema({
  CARUID: Number,
  deviceId: String,
  location: {
    coordinates: {
      type: [Number], // [lng, lat]
      index: "2dsphere", // allows geospatial queries
    },
  },
  crops: [CropSchema],
});

module.exports = mongoose.model("CropNode", CropNodeSchema, "cropnodes");

