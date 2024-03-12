const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  phone_number: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
