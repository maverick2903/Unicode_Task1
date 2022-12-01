const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HotelDB");

const postSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: Object,
    required: true,
  },
  mobile_no: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("UserDB", postSchema);

/* const OAuthSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
});

const User_OAuth = mongoose.model("UserDB_OAuth", OAuthSchema); */

module.exports = User;
/* module.exports = User_OAuth; */
