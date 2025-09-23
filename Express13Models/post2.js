  const express = require("express");
  const app = express();
  const mongoose = require('mongoose')
  const Schema = mongoose.Schema;;
  
  main()
  .then(() =>console.log("connection successfull"))
  .catch((err) =>
  console.log(err));
  async function main() {
   await  mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');   
  }
  

  //schema
  const userSchema = new Schema({
              
              username: String,
              email: String
        });

  const postSchema = new Schema({
            content: String,
              likes:Number,
              user: {
                type: Schema.Types.ObjectId,
                ref:"User",
              }
        });

        const User = mongoose.model("User",userSchema);
        const Post = mongoose.model("Post",postSchema);

    const addData = async () => {
     let user =  await User.findOne({username: "rahulkumar"});
    // new User(
    //     { username:"rahulKumar",
    //       email: "rahul@gmail.com"
    //     });      
        
      let post2 = new Post({
        content:"Bye Bye",
        likes:23,
      });

        post2.user = user;

        //await user1.save();
        await post2.save();

      }
       addData(); 
        