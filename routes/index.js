var express = require('express');
var router = express.Router();
var Task = require('../controllers/Task');
var positController = require('../controllers/posit');
//asi si hacemos una consulta directamente le decimos donde esta la conexion y ejecutamos la consulta y
// la mostramos directamente por consola
/*var db = require('../models/dbConection');
db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});*/

// GET home page.
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
// asi seria si llamaramos al controlador y nos devolviera el resultado y conforme al resultado mostramos
// si es correcto el resultado de la consulta o los errores que se podrian haber cometido
//router.get('/prueba',function(req,res){
//    Task.getAllTasks(function(err,rows){
//
//if(err)
//  {
//  res.json(err);
//  }
//  else
//  {
//  res.json(rows);
//  }
//
// });
//})
// y asi cuando se lo pasamos directamente al contralador y realizamos todas las operaciones ahi.
router.get('/prueba', Task.load);
router.get('/prueba/:status', Task.status);
// ruta para cargar datos de la base de datos
router.get('/posit', positController.carga);
// para actualizar un elemento, hacemos get para obtener los datos y luego hacemos put para actualizar y //volver a la ruta posit (esto lo haremos dentro del controlador con un res.redirect)
router.get('/posit/:id/editar', positController.edita);
router.put('/posit/:id', positController.actualiza);
//crear un nuevo posit, primero una ruta con get para poner un fomulario para meter los datos y otra para //añadir los datos a la base de datos
router.get('/posit/nuevo', positController.nuevo);
router.post('/posit/crear', positController.insertar);
//para borrar un registro, añadimos una ruta para asegurar al usuario que realmente quiere borrarlo y le añadiremos un boton de aceptar para realizar la operación.
router.get('/posit/:id/preborrar',positController.notificar);
router.delete('/posit/:id',positController.borrar);

module.exports = router;
