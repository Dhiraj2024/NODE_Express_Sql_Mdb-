const Listing = require("../models/listing");




//Index route--------
module.exports.index =  async(req, res) => {
     const allListings = await Listing.find({});
     res.render("listings/index.ejs",{allListings});
};

//new route---
module.exports.renderNewform = (req, res) => {
   res.render("listings/new.ejs");
};
//show route---------
 module.exports.showListing = async (req, res) => {
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
};


//Create Route
 module.exports.createListing   = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
 // console.log(url , ".." , filename);
   const newListing = new Listing(req.body.listing);
   newListing.owner = req.user._id;
   newListing.image = {url , filename};
   await newListing.save();
   req.flash("success","New Listing created!");
   res.redirect("/listings");
};


//Edit Route
 module.exports.renderEditForm  = async (req, res) => {
   let { id } = req.params;
   const listing = await Listing.findById(id);
     if(!listing){
     req.flash("error","Listing does not exist!");
     res.redirect("/listings");
   }
   res.render("listings/edit.ejs", { listing });
 };

//Update Route----------
  module.exports.updateListing  = async (req, res) => {
    let { id } = req.params;//MIDDLEWARE ME GAYA
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
      req.flash("success"," Listing Updated!");
    res.redirect(`/listings/${id}`);
  };


//Delete Route
    module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
    req.flash("success","Listing dleted!");
  res.redirect("/listings");
};