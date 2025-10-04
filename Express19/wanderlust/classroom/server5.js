const express = require("express");
const app = express();

// const user = require("./routes/user.js");
// const post = require("./routes/post.js");

const session = require("express-session");

const flash = require("connect-flash");
const path = require("path");

const sessionOptions = {
    secret: "MySupersecret" ,
    resave: false ,
    saveUninitialized: true,
};

app.use(session(sessionOptions));

app.use(flash());
app.set("view engine", "ejs");  // ⚡ "view-engine" nahi, "view engine"
app.set("views", path.join(__dirname, "views"));  // ✅ sahi function join()
 

// app.get("/test", (req, res) => {
//      res.send("chal be is  working");
// });

//MIDDLEWARE use 
app.use((req, res ,next ) =>{
  res.locals.successMsg  = req.flash("success");   // ✅ sahi key
    res.locals.errorMsg = req.flash("error");       // ✅ sahi key
  next();
});




app.get("/register", (req, res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;

  if(name === "anonymous"){
    req.flash("error","user not registered");
} else {
    req.flash("success", "user registered successfull" );
}

          res.redirect("/hello");
});


app.get("/hello", (req, res) => {
    // res.locals.successMsg  = req.flash("success");   // ✅ sahi key
    // res.locals.errorMsg = req.flash("error");       // ✅ sahi key
    
    res.render("page.ejs",{ name: req.session.name });
});


app.get("/", (req, res) => {
  console.dir(req.cookies);
     res.send("ooomgooo is  working");
});


app.listen(8090, () => {
    console.log(`app is listening on port 8090`);
});


