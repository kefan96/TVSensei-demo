const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const localStrategy = require("passport-local");
const flash = require('connect-flash');
const env = require('dotenv');
const User = require("./models/user");
const mongoose = require("mongoose");
env.config();

var PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://admin:tvsenseiadmin@cluster0-jyosx.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.log("ERROR: ", err.message);
});

app.use(flash());
app.use(bodyParser.urlencoded({
    extended: false
})); //For body parser
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
    secret: "Jake wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy({
    usernameField: 'email'
}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
  });


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

app.post("/signup", (req, res) => {
    User.register(new User({
            username: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            email: req.body.email
        }), req.body.password,
        (err, user) => {
            if (err) {
                req.flash("error", err.message);
                res.redirect("/signup");
            } else {
                passport.authenticate("local")(req, res, function () {
                    req.flash("success", "Signed Up Successfully! Welcome, " + user.firstname);
                    res.redirect("/lesson");
                });
            }
        });
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/lesson",
    failureRedirect: "/",
    failureFlash: true
  }), (req, res) => {
});

app.listen(PORT, () => {
    console.log("TVSensei Listen on Port " + PORT);
});