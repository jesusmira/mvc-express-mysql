var db = require('../models/dbConection');
exports.carga = function (req, res) {
    db.query('SELECT * FROM task', function (err, rows) {
        if (err) return res.render('error', {
            error: err
        });
        res.render('show', {
            rows: rows
        })
    })
};
exports.edita = function (req, res) {
    var id = req.params.id;
    db.query('SELECT * FROM task WHERE Id = ?', [id], function (err, rows) {
        if (err) return res.render('error', {
            error: err
        });
        res.render('edit', {
            datos: rows
        })
    })
};
exports.actualiza = function (req, res) {
    var id = parseInt(req.params.id);
    var titulo = req.body.titulo;
    var estado = req.body.estado;
    db.query('UPDATE task set Title = ?, Status =? WHERE Id=?', [titulo, estado, id], function (err) {
        if (err) return res.render('error', {
            error: err
        });
        res.redirect('/posit');
    })
};
// En este caso como el campo id es varchar tendremos primero que contar cuantos registros tenemos y tendremos que sumarle uno para el nuevo registro(lo hacemos asi esta vez, pero no es aconsejable ya que se puede dar id repetidas y tienen que ser unicas)
exports.nuevo = function (req, res) {
    db.query('SELECT COUNT(*) AS total FROM task', function (err, rows) {
        if (err) return res.render('error', {
            error: err
        });
        var Idtotal = JSON.parse(JSON.stringify(rows));
        Idtotal[0].total++;
        res.render('nuevo', {
            datos: Idtotal[0].total
        });
    })
};
exports.insertar = function (req, res) {
    var titulo = req.body.titulo;
    var estado = req.body.estado;
    var id = req.body.IdTotal;
    db.query('INSERT INTO task(Id, Title, Status) values (?,?,?)', [id, titulo, estado], function (err) {
        if (err) return res.render('error', {
            error: err
        });
        res.redirect('/posit');
    })
}
exports.notificar = function (req, res) {
    var id = req.params.id;
    res.render('borrar', {
        Id: id
    })
}
exports.borrar = function (req, res) {
    var id = req.params.id;
    db.query('DELETE FROM task WHERE Id =?', [id], function (err) {
        if (err) return res.render('error', {
            error: err
        });
        res.redirect('/posit');
    })
}
