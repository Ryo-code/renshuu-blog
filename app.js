'use strict';

let bodyParser  = require("body-parser"),
    express     = require('express'),
    app         = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, function(){
  console.log("Running blog server~~~~~!")
});
