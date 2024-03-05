const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  userimgurl: {
    type: String,
  },
  themeimgurl: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "posts",
    },
  ],
});
module.exports = mongoose.model("users", usersSchema);
