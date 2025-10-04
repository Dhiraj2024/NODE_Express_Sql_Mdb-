//          ==>schema
const mongoose = require('mongoose');

const  chatSchema = new mongoose.Schema({
    from:{
       type: String,
       required:true,
       maxLength:20,
    },
    to:{
       type: String,
          required:true,
    },
    msg:{
       type: String,
          required:true,
          //min:[2, "Price is too low for Selling"],
          maxLength:50,
        },
        created_at:{
       type: Number,
          required:true,
         // min:[2, "Price is too low for Selling"],
    },
});
const Chat = mongoose.model("Chat",chatSchema);
module.exports = Chat;