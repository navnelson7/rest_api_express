const express = require('express');
const router = express.Router();
const proyectosController = require("../controller/proyectosController.js");
//crea pryectos
//api/proyectos
router.post('/',
    proyectosController.crearProyecto
)

module.exports = router;