const express = require('express');
const router = express.Router();
const proyectosController = require("../controller/proyectosController.js");
const auth = require('../middleware/auth');
const {check} = require('express-validator');
//crea pryectos
//api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],  
    proyectosController.crearProyecto,
)

router.get('/',
    auth,
    proyectosController.crearProyecto
)
module.exports = router;