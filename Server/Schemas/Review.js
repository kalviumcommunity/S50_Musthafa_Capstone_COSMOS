const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  profilePic: {
    type: String, // URL to the profile picture
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  // rating: {
  //   type: Number,
  //   required: true,
  //   min: 1,
  //   max: 5
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
