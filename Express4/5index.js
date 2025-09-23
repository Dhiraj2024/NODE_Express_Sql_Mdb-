const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');

let port = 8090;
//---string,json get------------
app.use( express.urlencoded({extended: true}));

//--EJS----------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");  // ⚡ "view-engine" nahi, "view engine"
app.set("views", path.join(__dirname, "views"));  // ✅ sahi function join()
//---------------------------------------------------------

let posts = [{
    id:uuidv4(),
     username: "dhitaj",
     content: "i miss you",
},
{
    id:uuidv4(),
     username: "jkiitaj",
     content: "i will met you",
},
{
    id: uuidv4() ,
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
let id = uuidv4();
     posts.push({id, username,content});
       res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
let { id} = req.params;
     let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{ post });
});

app.patch("/posts/:id", (req, res) => {
let { id} = req.params;
let newContent = req.body.content;
     let post = posts.find((p) => id === p.id);
     post.content = newContent;
    res.send("working");
});


//--------port-No.----------
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});




