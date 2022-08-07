const mongoose = require("mongoose");

const GroupChatSchema = new mongoose.Schema({
  users: [String],
});

module.exports = mongoose.model("groupChat", GroupChatSchema);
