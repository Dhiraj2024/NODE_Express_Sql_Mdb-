const express = require("express");
const router = express.Router({mergeParams:  true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const {  reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


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

//REVIEWS---post--route-------
router.post("/",validateReview,wrapAsync( async (req, res) => {
 let listing = await Listing.findById(req.params.id);
 let newReview = new Review(req.body.review);

 listing.reviews.push(newReview);

 await newReview.save();
 await listing.save();
  req.flash("success","New Review created!");
res.redirect(`/listings/${listing._id}`);
}));

//REVIEWS---DELETE--route-------
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
    res.redirect(`/listings/${id}`);
}));


module.exports = router;
