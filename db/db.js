/* var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'my_db'
})

connection.connect()

function db(query, callback){
  connection.query(query, function(err, result){
    if(err){
      callback(err, err.sqlMessage)
    }else{
      callback(null, result);
    }
  });
} */

const Sequelize = require('sequelize');

const db = new Sequelize('acquire', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});


  module.exports = db