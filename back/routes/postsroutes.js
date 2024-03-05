const express = require("express");
const router = express.Router();
const postscontroller = require("../controllers/postscontrollers");

router.route("/add").post(postscontroller.addpost);
router.route("/").get(postscontroller.takeposts);

module.exports = router;
