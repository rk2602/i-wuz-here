const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
  parent: String,
  creator: String,
  creatorName: String,
  timestamp: { type: Date, default: Date.now },
  content: String,
});

module.exports = mongoose.model("chatMessage", ChatMessageSchema);
