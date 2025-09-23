const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();

const path = require("path");
const { count } = require('console');

let port = 8090;
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");  // ⚡ "view-engine" nahi, "view engine"
app.set("views", path.join(__dirname, "views"));  // ✅ sahi function join()
//-----SQL---------------
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'dhiraj',
    password:'dhiraj1',

});
//-------FAKER--------------------
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),  
    faker.internet.email(),
    faker.internet.password(),
  ];
};

app.get("/", (req, res) => {
    let q = `SELECT count(*) FROM students`;
try{
connection.query(q, (err , result) => {
    if(err) throw err;
    let count = result[0]["count(*)"];
    res.render("home.ejs",{ count });
});
}
catch (err){
 console.log(err);
 res.send("some error in DB");
}
});

//-----show ROUTES----------
app.get("/user", (req, res) => {
    let q = `SELECT * FROM students`;
try{
connection.query(q, (err , users) => {
    if(err) throw err;
  
    res.render("showusers.ejs",{ users});
});
}
catch (err){
 console.log(err);
 res.send("some error in DB");
}
});
//-----edit route------------------------
app.get("/user/:id/edit", (req, res) => {
    let {id} = req.params;
    let q = `SELECT * FROM students WHERE id='${id}'`;
    try{
     connection.query(q, (err , result) => {
    if(err) throw err;
    let user= result[0];
    res.render("edit.ejs",{user});
});
}
catch (err){
 console.log(err);
 res.send("some error in DB");
}
});

//------port--------
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

 