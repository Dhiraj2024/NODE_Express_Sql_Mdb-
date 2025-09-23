const express = require("express");
const app = express();
const path = require("path");

let port = 8090;

 

app.set("view-engine", "ejs");
// app.set("views",path.json(__dirname,"/views"));


app.get("/",(req,res) => {
    res.render("home.ejs");
});

app.get("/",(req,res) => {
    res.send("This is Dubai Your welcome");
});

app.get("/rolldice",(req,res) => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice.ejs", {num : diceVal });
});



app.listen(port,()  => {
    console.log(`app is listning on port ${port}`);

} );


