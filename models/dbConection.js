
var mysql      = require('mysql');
var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'prueba'
});

//connection.connect();
//
//connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//  if (err) throw err;
//  console.log('The solution is: ', rows[0].solution);
//});
//connection.connect(function(err) {
//  if (err) throw err;
//  connection.query("SELECT * FROM task", function (err, result, fields) {
//    if (err) throw err;
//    console.log(result);
//  });
//});
//connection.end();

module.exports=connection;
