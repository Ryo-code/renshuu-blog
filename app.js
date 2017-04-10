'use strict';

let bodyParser  = require("body-parser"),
    express     = require('express'),
    app         = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Route 0: Root route
app.get("/", (req, res) => {
  res.redirect("/blog");
});

//Route 1: Index~~
app.get("/blog", (req, res) => {
  res.render("index");
});

//Route 2: New~~
app.get("/show", (req, res) => {
    res.render("show");
});

//Route 3: Create~~
app.get("/show", (req, res) => {
    res.render("show");
});

//Route 4: Show~~
app.get("/show", (req, res) => {
    res.render("show");
});

//Route 5: Edit~~
app.get("/show", (req, res) => {
    res.render("show");
});

//Route 6: Update~~
app.get("/show", (req, res) => {
    res.render("show");
});

//Route 7: Delete~~
app.get("/show", (req, res) => {
    res.render("show");
});



app.listen(3000, function(){
  console.log("Running blog server~~~~~!")
});
