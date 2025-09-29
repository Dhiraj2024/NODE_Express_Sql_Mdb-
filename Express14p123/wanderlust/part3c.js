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
const { listingSchema , reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

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


//----route------
app.get("/", (req, res) => {
     res.send("Bhoot is  working");
      //console.log(allListings);
});
//for schema.js---------
const validateListing = (req,res,next) => {
 let {error} =  listingSchema.validate(req.body);
//  console.log(result); 
 if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
  throw new ExpressError(404, errMsg);
 }else{
    next();
 }
};


const validateReview = (req, res, next) => {
 let {error} =  reviewSchema.validate(req.body);
//  console.log(result); 
 if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
  throw new ExpressError(404, errMsg);
 }else{
    next();
 }
};


//Index route--------
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
  const listing = await Listing.findById(id).populate("reviews");
  res.render("listings/show.ejs", { listing });
}));

//Create Route
app.post("/listings",validateListing,wrapAsync( async (req, res) => {
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
app.put("/listings/:id",validateListing,wrapAsync(  async (req, res) => {
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


//REVIEWS---post--route-------
app.post("/listings/:id/reviews",validateReview,wrapAsync( async (req, res) => {
 let listing = await Listing.findById(req.params.id);
 let newReview = new Review(req.body.review);

 listing.reviews.push(newReview);

 await newReview.save();
 await listing.save();

res.redirect(`/listings/${listing._id}`);
}));

//REVIEWS---DELETE--route-------
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
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


 