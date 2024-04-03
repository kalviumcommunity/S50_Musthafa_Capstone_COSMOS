// Assuming you have mongoose installed and required
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username : {
    type : String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
  },
  video: {
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
        profilepic: String
      }
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
