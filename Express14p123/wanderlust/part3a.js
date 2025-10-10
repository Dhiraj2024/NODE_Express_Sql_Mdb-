const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const { asyncWrapProviders } = require("async_hooks");
const ExpressError = require("./utils/ExpressEroor.js");
const {listingSchema } = require("./schema.js");

 const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";   

app.use(express.static(path.join(__dirname, "public")));//for css
app.set("view engine", "ejs");  // ⚡ "view-engine" nahi, "view engine"
app.set("views", path.join(__dirname, "views"));  // ✅ sahi function join()
 app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

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
//=dhiraj2062004p_db_user
// -===========1dudEQlX1zjJF7oQ

// mongodb+srv://dhiraj2062004p_db_user:<db_password>@cluster0.usgfc19.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//mongodb+srv://dhiraj2062004p_db_user:1dudEQlX1zjJF7oQ@cluster0.usgfc19.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//----route------
app.get("/", (req, res) => {
     res.send("Bhoot is  working");
      //console.log(allListings);
});

//LISTNING--------
app.get("/listings",wrapAsync( async(req, res) => {
    const allListings = await Listing.find({});
     res.render("listings/index.ejs",{allListings});
}));  
//new route---
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show route---------
app.get("/listings/:id", wrapAsync( async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

//Create Route
app.post("/listings",wrapAsync( async (req, res) => {
 let result =  listingSchema.validate(req.body);
 console.log(result); 
 if(result.error){
  throw new ExpressError(404,res.error);
 }
 const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

//Edit Route
app.get("/listings/:id/edit",wrapAsync( async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
app.put("/listings/:id",wrapAsync(  async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id",wrapAsync(  async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}));

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


 