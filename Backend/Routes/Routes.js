const express = require("express");
const User = require("../database");
const router = express.Router();
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("passport");
const { response } = require("express");
require("../Authentication/passportAuth");
const { addListing, viewListing } = require("../Controllers/Listing");
const upload = require("../Middleware/Middleware");
const multer = require("multer");

router.post("/signup", async (req, resp) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    mobile_no: req.body.mobile_no,
    location: req.body.location,
    role: req.body.role,
    username: req.body.username,
    password: hashSync(req.body.password, 10),
  });

  user
    .save()
    .then((user) => {
      resp.status(200).send({
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
      token: token,
    });
  });
});

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, resp) => {
    let data = await User.find();
    resp.status(200).send(data);
  }
);

router.get("/googlelink", (req, resp) => {
  resp.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
  async (req, resp) => {
    try {
      resp.send(profile);
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/auth/google/failure", async (req, resp) => {
  try {
    resp.send("Some issue has occured");
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/protected", async (req, resp) => {
  resp.send("This works!");
});

router.post("/listing/add", upload.array("photos", 10), addListing);

router.get("/listing/view", viewListing);

module.exports = router;
