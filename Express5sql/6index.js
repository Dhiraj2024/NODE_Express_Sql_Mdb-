const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
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
let q= "INSERT INTO students (id, username ,email,password) VALUES ?";

//
let data = [];
for (let i=1;i <= 100 ; i++){
    console.log(getRandomUser());
}


// try{
// connection.query(q, [students], (err , result) => {
//     if(err) throw err;
//     console.log(result);
// });
// }
// catch (err){
//  console.log(err);
// }

// //-----CLI====
// connection.end();
