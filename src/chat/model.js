const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  createdAt: { type: Date, default: Date.now },
});

 const Message =mongoose.model("Message", messageSchema); 
module.exports = Message;