'use strict';

let methodOverride = require("method-override"),
    bodyParser     = require("body-parser"),
    express        = require('express'),
    app            = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(methodOverride("_method")); //Used to make the POST method in the edit file actually a PUT request (by overriding it)

const tempTHINGSarray = [
  {
    title: "First Blog Post", 
    image: "https://s-media-cache-ak0.pinimg.com/originals/1b/9c/de/1b9cded0bd00fe7cabe88a68a0b7aada.jpg", 
    video: "f09876543", 
    info: "This is the first blog post",
  },
  {
    title: "Blog Post Numero Duce", 
    image: "https://images2.alphacoders.com/467/467407.jpg", 
    video: "adfsdaf", 
    info: "This is the 2nd blog post",
  },
  {
    title: "Post of the Third", 
    image: "https://img.clipartfox.com/b76d78022cfb782b9727f33b49a1c5dd_1-10-vector-image-artistic-numbers-clipart_6621-3238.png", 
    video: "grwadsaf", 
    info: "This is the first blog post",
  },
];


//Route 1: Index~~ (Root redirects to homepage)
app.get("/", (req, res) => {
    res.render("index", {data: tempTHINGSarray});
});

//Route 2: New~~
app.get("/things/new", (req, res) => {
  res.render("new");
});

//Route 3: Create~~
app.post("/things", (req, res) => {
  res.redirect("/things/:id");
});

//Route 4: Show~~ (each individual blog post)
app.get("/things/:id", (req, res) => {
  res.render("show");
});

//Route 5: Edit~~
app.get("/things/:id/edit", (req, res) => {
  res.render("edit");
});

//Route 6: Update~~
app.put("/things/:id", (req, res) => {
  res.render("things/:id");
});

//Route 7: Delete~~
app.delete("/things/:id", (req, res) => {
  res.redirect("/thing");
});

app.listen(3001, () => {
  console.log("Running server on port 3001!");
});
