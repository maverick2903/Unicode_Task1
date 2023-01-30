const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  photos: {
    type: [String],
    required: true,
  },
  rules: {
    type: [String],
    required: true,
  },
  date: {
    type: [Date],
    required: true,
  },
});

const Listing = mongoose.model("ListDB", listSchema);

module.exports = Listing;
