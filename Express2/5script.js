const express = require("express");
const app = express();
const path = require("path");
let port = 8090;
app.set("view-engine", "ejs");
// app.set("views",path.json(__dirname,"/views"));
app.get("/ig/:username",(req,res) => {
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    // console.log(data);
    if(data){
    res.render("database.ejs" , { data });
    }else{
        res.render("error.ejs");
    }
}); 






app.listen(port,()  => {
    console.log(`app is listning on port ${port}`);

} );


