const express = require("express");
const app = express();

// const user = require("./routes/user.js");
// const post = require("./routes/post.js");

const session = require("express-session");

app.use(session ({secret: "MySupersecret"}));



app.get("/test", (req, res) => {
     res.send("chal be is  working");
});



//cookie----------------------------------------------------------------------------
// app.get("/cookie", (req, res) => {
//   res.cookie("name","hekkoll");
//     res.cookie("vvfdame","heccccckkoll");
//      res.send("cookiess is  working");
//       //console.log(allListings);
// });
// app.get("/greet", (req, res) => {
//   let { name = "anonymouse" } = req.cookies;
//      res.send(`Hi,${name} `);
// });

// app.get("/", (req, res) => {
//   console.dir(req.cookies);
//      res.send("ooomg is  working");
//       //console.log(allListings);
// });
//-------------------------------------------------------------------------------------------

//Singed cookie----------------------------------------------------------------------
// app.get("/sincookie", (req, res) => {
//   // res.cookie("name","vishal");
//   //   res.cookie("class","bhaaru");
//   res.cookie("name","vishal" , {signed: true});
//      res.send("cookiess is  working");
//       //console.log(allListings);
// });
// app.get("/verify", (req, res) => {
// console.log(req.cookies);//req.signedCookies
// res.send("verified");
// });

// app.get("/getcookie", (req, res) => {
//   res.cookie("name","vishal");
//     res.cookie("class","bhaaru");
//      res.send("see you is  working");
//       //console.log(allListings);
// });

app.get("/", (req, res) => {
  console.dir(req.cookies);
     res.send("ooomgooo is  working");
});


app.listen(8090, () => {
    console.log(`app is listening on port 8090`);
});


