const express = require("express");
const app = express();

let port = 8082;

app.listen(port,()  => {
    console.log(`app is listning on port ${port}`);

} );

app.get("/",(req,res) => {
    res.send("HELLO<, im root");
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

// app.use((req, res) => {
//     res.status(404).send("This path doesn't exist");
// });

app.post("/",(req,res)=>{
    res.send("You sent a post requst to root");
});

// app.get("/:username", (req,res) => {
//     console.log(req.params);
//     res.send("This path hiiihh exist");
// });


app.get("/:username", (req,res) => {
   let {username} = req.params;
    res.send(`WELCOME ---> @${username}.`);
}); 