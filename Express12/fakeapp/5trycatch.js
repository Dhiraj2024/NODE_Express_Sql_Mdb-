const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
const ExpressError = require("./ExpressError.js");


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
 await  mongoose.connect('mongodb://127.0.0.1:27017/fakeWhatsapp');   
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
app.get("/chats", asyncWrap(async (req,res) =>{
    let chats = await Chat.find();
     res.render("index.ejs",{ chats });
    //console.log(chats);
}));
//---new Route-----
app.get("/chats/new",asyncWrap( async (req,res) =>{
    // let chats = await Chat.find();
    //console.log(chats);
   // throw new ExpressError(404, "Page not found");
    res.render("new.ejs");
})); 
//---Create Route-----
app.post("/chats",asyncWrap( async (req,res) =>{
     let {from, to ,msg} = req.body;
   let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at:new Date(),
   });

await newChat.save();
   res.redirect("/chats");
}));
//async wrap
function asyncWrap(fn){
    return function (req,res,next){
        fn(req,res,next).catch((err) => next(err));
    };
}

//=================-NEW-------------------------------------
app.get("/chats/:id",asyncWrap( async(req,res,next) =>{
     let {id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
          next( new ExpressError(404, "Chat not found")); 
    }
   res.render("edit.ejs", { chat });
}));


//-Edit ROUTE----
app.get("/chats/:id/edit",asyncWrap( async(req,res) =>{
     let {id} = req.params;
    let chat = await Chat.findById(id);
   res.render("edit.ejs", { chat });
}));

//-Update ROUTE----
app.put("/chats/:id",asyncWrap( async(req,res) => {
     let { id } = req.params;
   let {msg: newMsg } = req.body;
   let updatedChat =await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
);
   console.log(updatedChat);
   res.redirect("/chats");
}));
//-----DELETE ROUTE------
app.delete("/chats/:id", asyncWrap(async(req ,res) => {
    let {id} = req.params;
    let deltedChat = await Chat.findByIdAndDelete(id);
    console.log(deltedChat);
    res.redirect("/chats");

}));


//----route------
app.get("/", (req, res) => {
     res.send("root is  working");
});


app.use((err ,req, res, next) => {
    let {status= 500 , message } = err;
 res.status(status).send(message);
  // console.log("-------errrorrrrr---------");
  // res.send(err);
   //next(err);
});

app.listen(8090, () => {
    console.log(`app is listening on port 8090`);
});

