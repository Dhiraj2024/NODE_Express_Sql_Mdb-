const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
//-----SQL---------------
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'dhiraj',
    password:'dhiraj1',

});
//-SQL-Connect--------

//-yaha se keval ek ka data ko insert karte hin ------
let q= "INSERT INTO students (id, username ,email,password) VALUES (?,?,?,?)";
let students = ["123", "123_newuser", "abc@gmail.com" ,"abc"];

try{
connection.query(q, students, (err , result) => {
    if(err) throw err;
    console.log(result);
});
}
catch (err){
 console.log(err);
}

//-----CLI====
connection.end();
//-------FAKER--------------------
let getRandomUser = () => {
  return {
    Id: faker.string.uuid(),
    username: faker.internet.username(),  
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};


