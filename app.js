'use strict';

let bodyParser  = require("body-parser"),
    express     = require('express'),
    app         = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); //Used to make the POST method in the edit file actually a PUT request (by overriding it)

//Route 0: Root route
app.get("/", (req, res) => {
  res.redirect("/thing");
});

//Route 1: Index~~
app.get("/things", (req, res) => {
  res.render("index");
});

//Route 2: New~~
app.get("/things/new", (req, res) => {
  res.render("new");
});

//Route 3: Create~~
app.post("/things", (req, res) => {
  res.redirect("/things/:id");
});

//Route 4: Show~~
app.get("/things/:id", (req, res) => {
  res.render("show");
});

//Route 5: Edit~~
app.get("/things/:id/edit", (req, res) => {
  res.render("edit");
});

//Route 6: Update~~
app.put("/dogs/:id", (req, res) => {
  res.render("things/:id");
});

//Route 7: Delete~~
app.delete("/things/:id", (req, res) => {
  res.redirect("/thing");
});

app.listen(3000, () => {
  console.log("Running blog server~~~~~!");
});
