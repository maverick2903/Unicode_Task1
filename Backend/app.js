const Routes = require("./Routes/Routes.js");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(session({ secret: "12345" }));
app.use("/", Routes);

app.use(passport.initialize());
app.use(passport.session());
app.listen(5000, () => console.log("Listening to port 5000"));
