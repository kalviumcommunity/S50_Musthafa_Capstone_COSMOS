const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  profilepic: {
    type: String,
    ref: "Profile"
  }
});

const postSchema = new mongoose.Schema({
  name: {
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
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Profile",
  },
  comments: [commentSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;