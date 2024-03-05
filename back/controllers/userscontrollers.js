const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.register = async (req, res) => {
  console.log(req.body);
  let { firstname, gender, lastname, date, email, password } = req.body;
  console.log(`${firstname.trim()} ${lastname.trim()}`);
  try {
    const isregister = await User.findOne({ email: email });
    if (isregister) {
      return res.status(400).json("user is already registered");
    }
    console.log(password, "this is the password");
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword, "this is the hashed password");
    const newUser = await User.create({
      firstname,
      lastname,
      gender,
      date,
      password: hashPassword,
      email,
      username: `${firstname.trim()} ${lastname.trim()}`,
    });
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    console.log("hi");
    const existUser = await User.findOne({ email }).populate("posts");
    console.log(existUser);
    if (!existUser) {
      return res.status(401).json("couldnt find this user");
    }
    console.log(existUser);
    bcrypt.compare(password, existUser.password, (err, isMatch) => {
      if (err || !isMatch) {
        console.log("problem");
        return res.status(402).json("invalid email or password");
      }
      console.log("here");
      const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log(token);

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 6000000,
        sameSite: "strict",
      });

      res.status(200).send({
        message: "Logged in successfully",
        user: existUser,
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 60,
      sameSite: "strict",
    });

    res.status(200).send({ message: "Logged out successfully" });
  } catch {
    res.status(500).send(error.message);
  }
};
exports.takeusers = async (req, res) => {
  console.log("hi");
  try {
    let data = await User.find().populate("posts");
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.update = async (req, res) => {
  console.log(req.body);
  try {
    const newinfo = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      Gender: req.body.Gender,
      location: req.body.location,
      bio: req.body.bio,
      userimgurl: req.body.url,
      themeimgurl: req.body.url2,
    };
    let doc = await User.findOneAndUpdate({ email: req.body.email }, newinfo, {
      new: true,
    });

    console.log(doc);
  } catch {
    res.status(500).json(err.message);
  }
};
