const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require('express-session');
const env = require('dotenv');
env.config();

var PORT = process.env.PORT || 8080;

//Models
const models = require("./models");
require('./config/passport/passport.js')(passport, models.user);
 
//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/lesson", (req, res) => {
    res.render("lesson");
});

app.get("/lesson/1", (req, res) => {
    res.render("lesson_1");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", passport.authenticate('local-signup', {
    successRedirect: '/lesson',
    failureRedirect: '/signup'
}), (req, res) => {

});

app.listen(PORT, () => {
    console.log("TVSensei Listen on Port " + PORT);
  });
