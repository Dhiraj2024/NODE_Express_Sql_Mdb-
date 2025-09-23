const mongoose = require('mongoose');

//mongoose.connect('mongodb://127.0.0.1:27017/test');

//----conection js wala code-------
main()
.then((res) => {
console.log("connection successfull");
})
.catch(err => console.log("some error occure"));
async function main() {
 await  mongoose.connect('mongodb://127.0.0.1:27017/test');   
}

// --schema collection--------
const  userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
});
const User = mongoose.model("User",userSchema);

// User.insertMany([
//    {name: "adam",email:"acd@gmail.com", age:45},
//   {name: "adam",email:"acd@gmail.com", age:45},
//    {name: "adam",email:"acd@gmail.com", age:45},
//     {name: "adam",email:"acd@gmail.com", age:45},
// ]).then((res) => {
//     console.log(res);
// });




// User.updateOne({name:"adam"} ,{age:50})
// .then((res) => {
// console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });



// User.updateMany({age:{$gt:45} },{age:45})
// .then((res) => {
// console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });
 
// User.findOneAndUpdate({name:"adam"} ,{ age:60 }, { new: true })
// .then((res) => {
// console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });



