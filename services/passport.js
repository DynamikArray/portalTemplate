const env = require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user,done)=>{
  done(null, user._id);
});

passport.deserializeUser((id, done)=>{
  User.findById(id)
  .then(user=>{
    done(null, user);
  });
});


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    //callback function after google gives us info
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //wwe already have a record with googleId
          done(null, existingUser);
        } else {
          //we dont ahve a records create a new one
          new User({
            googleId: profile.id,
            name: profile.displayName,
            email: shiftEmail(profile),
            accessToken: accessToken
          })
            .save()
            .then(user => {
              done(null, user);
            });
        } //end if existingUser
      }); //end findOne
    } //end callback function
  ) //end Strategy
); //end passport.use

/**********************************************
* Get the users email from there profile ,
* this will sometimes return a wierd pages.plusgoogle.com
* if a YOUTUBE brand account is used But it is a valid email
*
* var profile - profile response obj from google oauth
*
* returns email or false
*/
function shiftEmail(profile) {
  if (profile.emails) {
    var _email = profile.emails.shift();
    if (_email) {
      return _email.value;
    } else {
      return false;
    }
  }
}
