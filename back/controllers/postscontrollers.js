const Post = require("../models/posts");
const User = require("../models/Users");

exports.addpost = async (req, res) => {
  console.log(req.body);
  let { posttext, imgurl, usercreated } = req.body;
  try {
    const newPost = new Post({
      posttext,
      imgurl,
      usercreated,
    });
    const postreturn = await newPost.save();
    console.log(postreturn);
    const user = await User.findOne({ _id: usercreated });
    console.log(user);
    console.log("hi");
    const newinfo = { posts: [...user.posts, postreturn._id] };

    await User.findOneAndUpdate({ _id: usercreated }, newinfo, {
      new: true,
    });
    return res.status(200).json(postreturn);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.takeposts = async (req, res) => {
  try {
    let data = await Post.find().populate("usercreated");
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
