'use strict';

let methodOverride = require("method-override"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    express        = require('express'),
    app            = express();

/****   APP Config   ****/
mongoose.connect("mongodb://localhost/renshuu_blog_app"); //first time this code runs it'll create this db... after that it'll connect to it
app.set("view engine", "ejs");
app.use(express.static("public")); //so that we can serve our custom stylesheet
app.use(bodyParser.urlencoded({extended: true}));
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
const tempTHINGSarray = [
  {
    title: "This is Eri", 
    image: "https://s-media-cache-ak0.pinimg.com/originals/1b/9c/de/1b9cded0bd00fe7cabe88a68a0b7aada.jpg", 
    video: "xYyzn5D5GU8", 
    info: "This is the 1st post I put in the tempTHINGSarray. An Eri Nobuchika video, it's good",
  },
  {
    title: "Blog Post Numero Duce", 
    image: "https://images2.alphacoders.com/467/467407.jpg", 
    video: "yIRTh0fWVY4", 
    info: "This is the 2nd hardcoded blog post inside app.js",
  },
  {
    title: "Post of the Third", 
    image: "https://img.clipartfox.com/b76d78022cfb782b9727f33b49a1c5dd_1-10-vector-image-artistic-numbers-clipart_6621-3238.png", 
    video: "tRbK379V1U4", 
    info: "The 3rd hardcoded post",
  },
];


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
  Thing.create(req.body.blogpost, (err, newThing) => {
    //it's called "blogpost" because that's what I named it in the form
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
  res.redirect("/thing");
});

app.listen(3001, () => {
  console.log("Running server on port 3001!");
});
