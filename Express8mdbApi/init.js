const mongoose = require('mongoose');
const Chat = require("./models/chat.js");




main()
.then((res) => {
console.log("connection successfull");
})
.catch(err => console.log("some error occure"));
async function main() {
 await  mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');   
}

let allChats = [{
from :"neha",
to:"priya",
msg:"send me your exam sheet",
created_at:new Date(),
},
{
from :"neha",
to:"priya",
msg:"send me your exam sheet",
created_at:new Date(),
},
{
from :"neha",
to:"priya",
msg:"send me your exam sheet",
created_at:new Date(),
},
{
from :"neha",
to:"priya",
msg:"send me your exam sheet",
created_at:new Date(),
},];

Chat.insertMany(allChats);
