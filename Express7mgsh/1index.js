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

const user1 = new User({
    name: "adam",
    email:"acd@gmail.com",
    age:45,
});
user1.save();


const user2 = new User({
    name: "madam",
    email:"kncacd@gmail.com",
    age:345,
});
user2
.save()
.then((res) => {
console.log(res);
})
.catch((err) => {
    console.log(err);
});