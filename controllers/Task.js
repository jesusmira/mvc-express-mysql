var db = require('../models/dbConection');
// lo haremos asi cuando queramos pasarle al index.js lo que deseamos
//var Task={
//
//getAllTasks:function(callback){
//
//return db.query("Select * from task",callback);
//
//}};
//module.exports = Task;
// y asi directamente cuando nos lo pide el index.js y le devolvemos la vista, en este caso con json
exports.load = function(req, res){
    db.query('SELECT * FROM task', function (err, rows) {
    if (err) return res.json(err)
    res.json(rows)
  })
}

// ahora haremos uno que filtre por un campo(por ejemplo status que puede ser done o  pending) y
// otro que sea de insertar un nuevo elemento. para este ultimo modificaremos las plantillas y que
// me lo recoja los datos en un formulario y me reenvie a la pagina de prueba para ver los datos que he
// insertado. Para las plantillas en vez de ser normal lo pondremos con bootstrap

exports.status = function(req,res){
    var status = req.params.status;
    db.query('SELECT * FROM task where status = ?',[status], function (err, rows) {
    if (err) return res.json(err)
    res.json(rows)
  })
}
