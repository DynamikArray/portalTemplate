const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

module.exports = app => {

  //--START Google Specfically Youtube account access -- //
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/youtube.readonly",
        "profile",
        "email"
      ]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));
  //--END Google Specfically Youtube account access -- //



  app.get("/api/logout", (req,res)=>{
    req.logout();
    res.send(req.user);
  })

  app.get("/api/user", (req, res) => {    
    res.send(req.user)
  });


};
