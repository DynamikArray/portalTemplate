const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/youtube.readonly",
        "profile",
        "email"
      ]
      //
      //scope: ["https://www.googleapis.com/auth/plus.login","https://www.googleapis.com/auth/youtube.readonly"],
      /*
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/youtube.readonly"
      ]
      */
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/current_user", (req, res) => {
    res.send({user: req.user})
  });
};
