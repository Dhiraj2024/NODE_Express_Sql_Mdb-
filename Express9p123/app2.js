const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

 const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";   

app.use(express.static(path.join(__dirname, "public")));//for css
app.set("view engine", "ejs");  // ⚡ "view-engine" nahi, "view engine"
app.set("views", path.join(__dirname, "views"));  // ✅ sahi function join()
 app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
});
//LISTNING--------
app.get("/listings", async(req, res) => {
    const allListings = await Listing.find({});
     res.render("listings/index.ejs",{allListings});
});
//new route---
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show route---------
//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

// //route listing----
// app.get("/testListing",  async(req, res) => {
//     let sampleListing = new Listing({
//         title:"My new Villah",
//         description:"By the main road ranchi",
//         price:1200,
//         location:"jamtada ranchi",
//         country:"muradamaadh",
//     });

//    await sampleListing.save() ;
//    console.log("sample was saved");
//    res.send("successful testing");
// });

app.listen(8090, () => {
    console.log(`app is listening on port 8090`);
});


