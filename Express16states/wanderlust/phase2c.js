const express = require("express");
const app = express();
const mongoose = require('mongoose');
//const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
//const wrapAsync = require("./utils/wrapAsync.js");
//const { asyncWrapProviders } = require("async_hooks");
const ExpressError = require("./utils/ExpressEroor.js");
// const { listingSchema , reviewSchema } = require("./schema.js");
// const Review = require("./models/review.js");
const cookieParser = require("cookie-parser");


const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


const session = require("express-session");

const flash = require("connect-flash");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";   


app.use(express.static(path.join(__dirname, "public")));//for css
app.set("view engine", "ejs");  // ⚡ "view-engine" nahi, "view engine"
app.set("views", path.join(__dirname, "views"));  // ✅ sahi function join()
 app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
//app.use(cookieParser());//cookies----------
app.use(cookieParser("secretcode"));//signed cookie



const sessionOptions = {
    secret: "MySupersecretcode" ,
    resave: false ,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 1000,
        maxAge: 7*24*60*60*1000 , 
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

main()
.then(() => {
console.log("connection successfull");
})
.catch(err => {
    console.log(err);
});

async function main() {
 await  mongoose.connect(MONGO_URL);   
}


//----route------
// app.get("/", (req, res) => {
//      res.send("Bhoot is  working");
//       //console.log(allListings);
// });


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
//   console.dir(req.cookies);
     res.send("Root is  working");
});

//midleware for flash--------
app.use((req, res ,next ) =>{
  res.locals.successMsg  = req.flash("success");   // ✅ sahi key
    res.locals.errorMsg = req.flash("error");       // ✅ sahi key
  next();
});


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  if (res.headersSent) {   // prevent double response
    return next(err);
  }
  res.status(statusCode).render("error.ejs", { err, message });
});

app.listen(8090, () => {
    console.log(`app is listening on port 8090`);
});


 