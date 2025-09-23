const express = require("express");
const app = express();
// const path = require("path");

let port = 8090;

 

app.set("view-engine", "ejs");
// app.set("views",path.json(__dirname,"/views"));


app.get("/",(req,res) => {
    res.render("home.ejs");
})

app.get("/",(req,res) => {
    res.send("This is Dubai Your welcome");
});

app.get("/rolldice",(req,res) => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice.ejs", {num : diceVal });
});

app.get("/ig/:username",(req,res) => {
    const followers = ["adam", "bobe", "dhiraj", "acs"];
    let { username } = req.params;
   // console.log(username);
    res.render("loops.ejs", {username ,followers});
}); 






app.listen(port,()  => {
    console.log(`app is listning on port ${port}`);

} );


