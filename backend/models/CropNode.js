// models/CropNode.js
const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  name: String,
  yield: { type: Map, of: Number }, // e.g., { "1987": 47.1, "1988": 52.9 }
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
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                             ^ this last argument explicitly links to collection name
