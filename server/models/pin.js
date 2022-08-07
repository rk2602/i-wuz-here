const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
  creatorId: String,
  lat: Number,
  lng: Number,
  name: String
});

// compile model from schema
module.exports = mongoose.model("pin", PinSchema);