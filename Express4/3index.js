const express = require("express");
const app = express();
const path = require("path");
let port = 8090;
//---string,json get------------
app.use( express.urlencoded({extended: true}));

//--EJS----------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");  // ⚡ "view-engine" nahi, "view engine"
app.set("views", path.join(__dirname, "views"));  // ✅ sahi function join()
//---------------------------------------------------------

let posts = [{
     username: "dhitaj",
     content: "i miss you",
},
{
     username: "jkiitaj",
     content: "i will met you",
},
{
     username: "maharaj",
     content: "i know you",
},
];


app.get("/posts", (req, res) => {
       res.render("index.ejs", { posts });

});

app.get("/posts/new", (req, res) => {
       res.render("lindex.ejs");

});

app.post("/posts", (req, res) => {
let { username , content} = req.body;
     posts.push({username,content});
       res.redirect("/posts");
});

//app.get("/ig/:username", (req, res) => {
    //let { username } = req.params;
   // const instaData = require("./data.json");
    // const data = instaData[username];
    
    // if (data) {
    //     res.render("database.ejs", { data });
    // } else {
    //     res.render("error.ejs");
    // }
//});


//--------port-No.----------
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});




