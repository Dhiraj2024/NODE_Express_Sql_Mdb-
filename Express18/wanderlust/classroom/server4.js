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


app.get("/register", (req, res) => {
    let {name = "Nilam jaisi"} = req.query;
    req.session.name = name;
    req.flash("success ", "user registered sucsessfully !");
     res.redirect("/hello");
});


app.get("/hello", (req, res) => {
     res.render("page.ejs",{ name: req.session.name ,msg: req.flash("sucess") });
});

app.get("/", (req, res) => {
  console.dir(req.cookies);
     res.send("ooomgooo is  working");
});


app.listen(8090, () => {
    console.log(`app is listening on port 8090`);
});


