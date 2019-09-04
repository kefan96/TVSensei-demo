const express = require("express");
const app = express();

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

app.listen(3000, () => {
    console.log("TVSensei Listen on Port 3000");
  });
