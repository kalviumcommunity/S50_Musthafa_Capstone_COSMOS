const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post'
  }
});

const profile = mongoose.model("Profile", profileSchema);

module.exports = profile;
