const express = require("express");
const router = express.Router();
const userscontroller = require("../controllers/userscontrollers");

router.route("/add").post(userscontroller.register);
router.route("/login").post(userscontroller.login);
router.route("/logout").get(userscontroller.logout);
router.route("/").get(userscontroller.takeusers);
router.route("/edit").patch(userscontroller.update);
router.route("/takeuser/:id").get(userscontroller.takeuser);

module.exports = router;
