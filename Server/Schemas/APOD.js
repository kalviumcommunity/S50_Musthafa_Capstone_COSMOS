const mongoose = require("mongoose");

const apodSchema = new mongoose.Schema(
  {
    copyright: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      unique: true,
    },
    explanation: {
      type: String,
    },
    hdurl: {
      type: String,
    },
    media_type: {
      type: String,
    },
    service_version: {
      type: String,
    },
    title: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Apod = mongoose.model("Apod", apodSchema);

module.exports = Apod;
