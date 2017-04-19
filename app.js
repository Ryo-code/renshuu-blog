'use strict';

let methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    express        = require("express"),
    app            = express();

/****   APP Config   ****/
mongoose.connect("mongodb://localhost/renshuu_blog_app"); //first time this code runs it'll create this db... after that it'll connect to it
app.set("view engine", "ejs");
app.use(express.static("public")); //so that we can serve our custom stylesheet
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); //must go AFTER bodyParser
app.use(methodOverride("_method")); //Used to override the POST methods in edit & delete

/****   Mongoose Model Config   ****/
const thingSchema = new mongoose.Schema({
  title: String,
  image: String,
  video: String,
  info: String,
  timestamp: {type: Date, default: Date.now} //Makes it so that the current date is automatically inserted by default
});
const Thing = mongoose.model("Thing", thingSchema);

/****** Created this just to test the mongo set-up, delete later *****/
// Thing.create({
//     title: "First Blog Post...?", 
//     image: "https://s-media-cache-ak0.pinimg.com/originals/1b/9c/de/1b9cded0bd00fe7cabe88a68a0b7aada.jpg", 
//     video: "f09876543", 
//     info: "Not really a post, but w/e. I hardcoded this into my app.js file with the 'Thing.create' function, rather than some fancy form",
// });

/****   RESTful Routes   ****/
//Route 1: Index~~ (Root redirects to homepage)
app.get("/", (req, res) => {
  Thing.find({}, (err, things) => {
    if(err){
      console.log("Error!");
    } else {
      res.render("index", {data: things});
    }
  });
});

//Route 2: New~~
app.get("/things/new", (req, res) => {
  res.render("new");
});

//Route 3: Create~~
app.post("/things", (req, res) => {
  console.log("Unsanitized version: " + req.body)
  req.body.blogpost.info = req.sanitize(req.body.blogpost.info)
  //The first "req.body" refers to "the data coming from the form"
  //the "blogpost.info" refers to "additional info" in new.ejs...
  console.log("Sanitized version: " + req.body)
  //This sanitization step is necessary because you did "<%-" instead of "<%="
  //Essentially, it just means that if anyone types <script> [some nasty code] </script>,
  //then it won't actually run. So this is only necessary if users will be
  //writing stuff on here (e.g. in the comments section).
  
  Thing.create(req.body.blogpost, (err, newThing) => {
    //It's called "blogpost" because that's what I named it in the form
    if(err){
      console.log("Error... redirecting back to the form")
      res.render("new");
    } else {
      console.log(newThing);
      res.redirect("/");
    }
  });
});

//Route 4: Show~~ (each individual blog post)
app.get("/things/:id", (req, res) => {
  Thing.findById(req.params.id, (err, foundThing) => {
    if(err){
      res.redirect("/");
    } else {
  res.render("show", {data: foundThing});
    }
  });
});

//Route 5: Edit~~
app.get("/things/:id/edit", (req, res) => {
  Thing.findById(req.params.id, (err, foundThing) => {
    if(err){
      res.redirect("/things");
    } else {
  res.render("edit", {data: foundThing});
    }
  });
});

//Route 6: Update~~
app.put("/things/:id", (req, res) => {
  req.body.blog.info = req.sanitize(req.body.blog.info) //see the Create route for comments
  Thing.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
  // the 3 parameters: 1) ID, 2) new data (i.e. the name attribute in the edit form), 3) callback
    if(err){
      res.redirect("/things");
    } else {
      res.redirect("/things/" + req.params.id);
    }
  });  
});

//Route 7: Delete~~
app.delete("/things/:id", (req, res) => {
  Thing.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      console.log("There was an error in finding and delete the post...");
      res.redirect("/blogs");
    } else {
      res.redirect("/");
    }
  })
});

app.listen(3001, () => {
  console.log("Running server on port 3001!");
});
