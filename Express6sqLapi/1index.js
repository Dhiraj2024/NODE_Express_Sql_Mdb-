const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();



let port = 8090;
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

//-yaha se multiple data ko insert karte hin ------
// let q= "INSERT INTO students (id, username ,email,password) VALUES ?";

// //
// let data = [];
// for (let i=1;i <= 100 ; i++){
//     data.push(getRandomUser());//fake user
// }


// try{
// connection.query(q, [data], (err , result) => {
//     if(err) throw err;
//     console.log(result);
// });
// }
// catch (err){
//  console.log(err);
// }
// //-----CLI====
// connection.end();
//-----ROUTES----------

app.get("/", (req, res) => {
    let q = `SELECT count(*) FROM students`;
try{
connection.query(q, (err , result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
});
}
catch (err){
 console.log(err);
 res.send("some error in DB");
}
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

 