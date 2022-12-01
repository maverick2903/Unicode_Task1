require("dotenv").config();

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const User = require("../database");
const passport = require("passport");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SecretKey;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      /* profile = JSON.stringify(profile); */
      User.findOne({ email: profile.emails[0].value }, function (err, user) {
        console.log("hi");
        console.log(profile.emails[0].value);
        if (err) {
          return done(err);
        } else if (user) {
          console.log("found");
          return done(null, user);
        } else {
          return done(err, false);
        }
      });
    }
  )
);
