const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  messages : [
    {
      username: {
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
      },
    },
  ],
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
