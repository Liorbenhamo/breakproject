const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  posttext: {
    type: String,
  },
  imgurl: {
    type: String,
  },
  usercreated: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  ],
  comments: [
    {
      Comment: {
        usercommented: {
          type: mongoose.Types.ObjectId,
          ref: "users",
        },
        commentofuser: {
          type: String,
        },
      },
    },
  ],
});
module.exports = mongoose.model("posts", postsSchema);
