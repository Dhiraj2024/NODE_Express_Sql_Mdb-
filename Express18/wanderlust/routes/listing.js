const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner ,validateListing}= require("../middleware.js");






//Index route--------
router.get("/",wrapAsync( async(req, res) => {
    const allListings = await Listing.find({});
     res.render("listings/index.ejs",{allListings});
}));
//new route---
router.get("/new",isLoggedIn, (req, res) => {
   res.render("listings/new.ejs");
});

//show route---------
router.get("/:id", wrapAsync( async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ 
     path: "reviews" ,  //data laa rahe hi
     populate : { 
     path:"author",
  },
}); //data laa rahe hi
  if(!listing){
    req.flash("error","Listing does not exist!");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
}));


//Create Route
router.post("/",isLoggedIn,
   validateListing,
   wrapAsync( async (req, res) => {
   const newListing = new Listing(req.body.listing);
   newListing.owner = req.user._id;
   await newListing.save();
   req.flash("success","New Listing created!");
   res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit",
  isLoggedIn, 
  isOwner,
  wrapAsync( async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
    if(!listing){
    req.flash("error","Listing does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(  async (req, res) => {
  let { id } = req.params;//MIDDLEWARE ME GAYA
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success"," Listing Updated!");
  res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(  async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
    req.flash("success","Listing dleted!");
  res.redirect("/listings");
}));

module.exports = router;