const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");

 const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";   

app.use(express.static(path.join(__dirname, "public")));//for css
app.set("view engine", "ejs");  // ⚡ "view-engine" nahi, "view engine"
app.set("views", path.join(__dirname, "views"));  // ✅ sahi function join()
app.use(express.urlencoded({extended: true})); 

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


