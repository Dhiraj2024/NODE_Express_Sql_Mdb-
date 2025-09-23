const express = require("express");
const app = express();

console.dir(app);

let port = 8081;

app.listen(port,()  => {
    console.log(`app is listning on port ${port}`);

} );

app.get("/",(req,res) => {
    res.send("you connected root path");
});
app.get("/apple",(req,res) => {
    res.send("you connected apple path");
});
app.get("/orange",(req,res ) => {
    res.send("you connected orange path");
});
// app.get("*", (req,res) => { //nai chala
//     res.send("This path doesn't exist");
// });

app.use((req, res) => {
    res.status(404).send("This path doesn't exist");
});

app.post("/",(req,res)=>{
    res.send("You sent a post requst to root");
});