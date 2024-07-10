const mongoose = require("mongoose");

const messageItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  profile_picture: {
    type: String,
    ref: "Profile",
  },
});

const messageSchema = new mongoose.Schema({
  messages: [messageItemSchema],
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
