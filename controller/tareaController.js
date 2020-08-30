const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//crear una nueva tarea
exports.crearTarea = async(req, resp) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return resp.status(400).json({ errores: errores.array() })
    }
}