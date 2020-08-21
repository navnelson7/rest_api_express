const express = require('express');
const router = express.Router();
const proyectosController = require("../controller/proyectosController.js");
const auth = require('../middleware/auth');
//crea pryectos
//api/proyectos
router.post('/',
    auth,
    proyectosController.crearProyecto,
)

router.get('/',
    auth,
    proyectosController.crearProyecto
)
module.exports = router;