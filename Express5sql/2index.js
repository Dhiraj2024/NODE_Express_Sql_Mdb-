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
try{
connection.query("SHOW TABLES",(err,result) => {
    if(err) throw err;
    console.log(result);
});
}
catch (err){
 console.log(err);
}

//---CLI---------
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


