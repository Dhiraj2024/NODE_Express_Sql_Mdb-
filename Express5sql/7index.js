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
let q= "INSERT INTO person (id, username ,email,password) VALUES ?";

//
let data = [];
for (let i=1;i <= 100 ; i++){
    data.push(getRandomUser());//fake user
}


try{
connection.query(q, [data], (err , result) => {
    if(err) throw err;
    console.log(result);
});
}
catch (err){
 console.log(err);
}
//-----CLI====
connection.end();
//"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p

//dusre terminal me  //"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < schema.sql  
