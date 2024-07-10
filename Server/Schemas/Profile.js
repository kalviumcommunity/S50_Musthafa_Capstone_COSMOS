const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
  },
  communities: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "community",
  },
  saved_posts : {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
  },
  bio: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const profile = mongoose.model("Profile", profileSchema);
module.exports = profile;
