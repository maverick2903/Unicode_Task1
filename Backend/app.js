const authRoutes = require("./Routes/authRoutes.js");
const express = require("express");
const passport = require("passport");
const app = express();

app.use(express.json());
app.use("/", authRoutes);
app.use(passport.initialize());
app.listen(5000, () => console.log("Listening to port 5000"));
