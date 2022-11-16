const express = require("express");
const User = require("../database");
const router = express.Router();
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("passport");
require("../Authentication/passportAuth");

router.post("/signup", async (req, resp) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    mobile_no: req.body.mobile_no,
    name: req.body.name,
    location: req.body.location,
    role: req.body.role,
    username: req.body.username,
    password: hashSync(req.body.password, 10),
  });

  user
    .save()
    .then((user) => {
      resp.send({
        success: true,
        message: "Sign Up successful",
        user: {
          id: user._id,
          username: user.username,
        },
      });
    })
    .catch((err) => {
      resp.send({
        success: false,
        message: "Sign Up failed",
        error: err,
      });
    });
});

router.post("/login", async (req, resp) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return resp.status(401).send({
        success: false,
        message: "User not found",
      });
    }
    if (!compareSync(req.body.password, user.password)) {
      return resp.status(401).send({
        success: false,
        message: "Password Invalid",
      });
    }
    const payload = {
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.SecretKey, { expiresIn: "1d" });
    return resp.status(200).send({
      success: true,
      message: "Logged In successfully",
      token: "Bearer " + token,
    });
  });
});

router.get(
  "/authTest",
  passport.authenticate("jwt", { session: false }),
  (req, resp) => {
    return resp.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, resp) => {
    let data = await User.find();
    resp.status(200).send(data);
  }
);

router.get("/", (req, resp) => {
  resp.send('<a href="/auth/google">Authenticate with Google</a>');
});

module.exports = router;
