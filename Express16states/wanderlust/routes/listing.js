const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { listingSchema , reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");


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
//Index route--------
router.get("/",wrapAsync( async(req, res) => {
    const allListings = await Listing.find({});
     res.render("listings/index.ejs",{allListings});
}));
//new route---
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show route---------
router.get("/:id", wrapAsync( async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if(!listing){
    req.flash("error","Listing does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
}));


//Create Route
router.post("/",validateListing,wrapAsync( async (req, res) => {
 const newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash("success","New Listing created!");
  res.redirect("/listings");
}));

//Edit Route
router.get("/",wrapAsync( async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
    if(!listing){
    req.flash("error","Listing does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id",validateListing,wrapAsync(  async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success"," Listing Updated!");
  res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id",wrapAsync(  async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
    req.flash("success","Listing dleted!");
  res.redirect("/listings");
}));

module.exports = router;