const express = require("express"); 
const router = express.Router();

router.get("/:senderId/:receiverId", async (req, res) => {
  const { senderId, receiverId } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  }).sort("createdAt");
  res.json(messages);
});
