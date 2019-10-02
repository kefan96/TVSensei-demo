const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const localStrategy = require("passport-local");
const flash = require('connect-flash');
const env = require('dotenv');
const User = require("./models/user");
const Profile = require("./models/profile")
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const fs = require('fs');

// file uploading
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.wav');
    }
})
const upload = multer({
    storage: storage
});

// IBM watson language translator API
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: 'cyzh50CogKZUJqrWtOrQ68PUINkMjp7v0pwVjNjku5VQ',
    url: 'https://gateway.watsonplatform.net/language-translator/api',
    disable_ssl_verification: true,
});

// IBM watson speech to text API
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');


const speechToText = new SpeechToTextV1({
    iam_apikey: 'MA0UI5-iqOGSU1t0McSEuKyyy9nIqpIsEQcDvjBUxBd1',
    url: 'https://stream.watsonplatform.net/speech-to-text/api',
    disable_ssl_verification: true,
});

function onEvent(name, event) {
    console.log(name, JSON.stringify(event, null, 2));
};

env.config();

var PORT = process.env.PORT || 3000;

// mongoDB connect
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
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
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

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// seedDB();


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/lesson", isLoggedIn, (req, res) => {
    res.render("lesson");
});

app.get("/lesson/1", isLoggedIn, (req, res) => {
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
    successFlash: "Logged you in!",
    failureRedirect: "/",
    failureFlash: true
}), (req, res) => {});

// log out route
app.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/");
});

// upload profile
app.post("/profile", isLoggedIn, (req, res) => {
    User.findById(req.user._id, (err, foundUser) => {
        if (err) {
            req.flash("error", err.message);
        } else {
            Profile.create(req.body.profile, (err, profile) => {
                if (err) {
                    console.log(req.body.profile)
                    console.log(err.message)
                    req.flash("error", err.message);
                } else {
                    profile.author.id = req.user._id;
                    profile.author.username = req.user.username;
                    profile.save();
                    foundUser.profile = profile._id;
                    foundUser.save();
                    req.flash("success", "Profile updated!");
                    res.redirect("back");
                }
            });
        }
    });
});

app.put("/profile/:id", isLoggedIn, (req, res) => {
    Profile.findByIdAndUpdate(req.params.id, req.body.profile, (err, updatedProfile) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success", "Profile updated!");
            res.redirect("back");
        }
    });
});

app.get("/user/:id", isLoggedIn, (req, res) => {
    let id = req.params.id;
    User.findById(id).populate("profile").exec((err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            res.render("user", {
                user: foundUser
            });
        }
    })
});

app.get("/apitest", (req, res) => {
    res.render("apitest");
});

app.post("/apitest", (req, res) => {
    languageTranslator.translate(req.body.input)
        .then(translationResult => {
            res.status(200).send({
                translation: translationResult
            });
        }).catch(err => {
            console.log('error:', err.message);
        });
});

app.get("/apitest/speech-to-text", (req, res) => {
    res.render("apitest_speech2text");
});

app.post("/apitest/speech-to-text", upload.single('audio'), (req, res) => {

    const params = {
        content_type: 'audio/wav',
        objectMode: true
    };
    var recognizeStream = speechToText.recognizeUsingWebSocket(params);
    fs.createReadStream('public/uploads/' + req.file.filename).pipe(recognizeStream);
    /*
    // these two lines of code will only work if `objectMode` is `false`
    // pipe out the transcription to a file
    recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
    // get strings instead of Buffers from `data` events
    recognizeStream.setEncoding('utf8');
    */

    recognizeStream.on('data', function (event) {
        onEvent('Data:', event);
        if (event.results.length > 0){
            res.status(200).json(event.results[0].alternatives[0]);
        } else {
            console.log("something went wrong");
        }
    });
    recognizeStream.on('error', function (event) {
        onEvent('Error:', event);
    });
    recognizeStream.on('close', function (event) {
        onEvent('Close:', event);
    });
});

app.listen(PORT, () => {
    console.log("TVSensei Listen on Port " + PORT);
});

// middleware

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You should be logged in do that!")
    res.redirect("/");
}

function seedDB() {
    User.deleteMany({}, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("removed users!!!");
        }
    });
    Profile.deleteMany({}, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("removed profiles!!!")
        }
    });
}