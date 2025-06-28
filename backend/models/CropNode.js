const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  deviceId: String,
  CARUID: Number,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" } // [lng, lat]
  },
  crops: [
    {
      name: String,
      yield: { type: Map, of: Number },
      area: { type: Map, of: Number }
    }
  ]
});

module.exports = mongoose.model("CropNode", cropSchema);
