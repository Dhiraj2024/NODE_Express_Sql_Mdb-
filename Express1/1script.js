const express = require("express");
const app = express();

console.dir(app);

let port = 8080;

app.listen(port,()=>{
    console.log(`app is listning on port ${port}`);

} );

app.use((req, res)=>{
    //1// console.log(req);
console.log("request recived");
//2// res.send("This is a basic response");

//3// res.send({
//     name:"apple",
//     color:"Red",
// });
let code="<h1>Fruite</h1> <ul><li>apple</li><li>orange</li></ul>";
res.send(code);
}); 
