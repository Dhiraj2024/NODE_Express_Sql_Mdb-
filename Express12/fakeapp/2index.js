const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");


const path = require("path");
const { count } = require('console');
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, "public")));//for css
app.set("view engine", "ejs");  // ⚡ "view-engine" nahi, "view engine"
app.set("views", path.join(__dirname, "views"));  // ✅ sahi function join()
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
main()
.then((res) => {
console.log("connection successfull");
})
.catch(err => console.log("some error occure"));
async function main() {
 await  mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');   
}

let chat1 = new Chat({
from :"neha",
to:"priya",
msg:"send me your exam sheet",
created_at:new Date(),
});

chat1
.save()
.then((res) => {
console.log(res);
})
.catch((err) => {
    console.log(err);
});
//---index Route-----
app.get("/chats", async (req,res) =>{
    let chats = await Chat.find();
    //console.log(chats);
    res.render("index.ejs",{ chats });
});
//---new Route-----
app.get("/chats/new", async (req,res) =>{
    // let chats = await Chat.find();
    //console.log(chats);
    res.render("new.ejs");
});
//---Create Route-----
app.post("/chats", (req,res) =>{
     let {from, to ,msg} = req.body;
   let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at:new Date(),
   });
newChat
.save()
.then((res) => {
    console.log("chat was saved");
})
.catch((err) => {
    console.log(err);
});
   res.redirect("/chats");
});
//-Edit ROUTE----
app.get("/chats/:id/edit", async(req,res) =>{
     let {id} = req.params;
    let chat = await Chat.findById(id);
   res.render("edit.ejs", { chat });
});
//-Update ROUTE----
app.put("/chats/:id", async(req,res) => {
     let { id } = req.params;
   let {msg: newMsg } = req.body;
   let updatedChat =await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
);
   console.log(updatedChat);
   res.redirect("/chats");
});
//-----DELETE ROUTE------



//----route------
app.get("/", (req, res) => {
     res.send("root is  working");
});

app.listen(8090, () => {
    console.log(`app is listening on port 8090`);
});

