const mongoose = require('mongoose');

//mongoose.connect('mongodb://127.0.0.1:27017/test');

//----conection js wala code-------
main()
.then((res) => {
console.log("connection successfull");
})
.catch(err => console.log("some error occure"));
async function main() {
 await  mongoose.connect('mongodb://127.0.0.1:27017/Amazon');   
}

// --schema collection--------
const  bookSchema = new mongoose.Schema({
    title:{
       type: String,
       required:true,
       maxLength:20,
    },
    author:{
       type: String,
          required:true,
    },
    price:{
       type: Number,
          required:true,
          min:[2, "Price is too low for Selling"],
    },
});
const Book = mongoose.model("Book",bookSchema);

Book.findByIdAndUpdate("68c94a17641a3ab6a1358646",{price:-500},
    {runValidators:true}).then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err.errors.price.properties.message);
});
// let book1 = new Book({
//     title: "adamanam",
//     author:"walker x dof",
//     price:4500,
// });


// book1
// .save()
// .then((res) => {
// console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });
