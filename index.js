const env = require("dotenv").config();
const PORT = process.env.PORT || 5555; // .env is handling this in reality

const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

mongoose.connect(process.env.MONGO_URI, {useMongoClient: true});
require('./models/User');
require('./services/passport.js')

const app = express();

app.use(
  cookieSession({
    maxAge:30*24*60*60*1000,
    keys:[process.env.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Include our routes
require('./routes/authRoutes')(app);


app.listen(PORT);
console.log("API Server is listening on Port: " + PORT);
