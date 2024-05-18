const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  caption: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  topic: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: {
        name: String,
        comment: String,
        profilepic: String,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
