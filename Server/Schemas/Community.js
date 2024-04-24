const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String
  },
  members: {
    type: []
  },
  communityprofile : {
    type: String
  },
  creator : {
    type : String
  },
  description : {
    type : String
  }
});

const community = mongoose.model("community", CommunitySchema);

module.exports = community;
