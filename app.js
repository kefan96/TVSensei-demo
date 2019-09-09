const express = require("express");
const bodyParser = require("body-parser");
const app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

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

app.listen(PORT, () => {
    console.log("TVSensei Listen on Port " + PORT);
  });
