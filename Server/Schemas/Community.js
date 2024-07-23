const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Profile",
  },
  communityprofile: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  description: {
    type: String,
  },
});

const community = mongoose.model("community", CommunitySchema);

module.exports = community;
