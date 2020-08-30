const express = require('express');
const router = express.Router();
const proyectosController = require("../controller/proyectosController.js");
const auth = require('../middleware/auth');
const { check } = require('express-validator');
//crea pryectos
//api/proyectos
router.post('/',
    auth, [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectosController.crearProyecto,
)

//obtener rodos los proyectos
router.get('/',
    auth,
    proyectosController.obtenerProyectos
)

//actualizar proyectos via ID
router.put('/:id',
    auth, [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectosController.actualizaProyecto
);

//eliminar proyectos
router.delete('/:id',
    auth,
    proyectosController.eliminarProyecto
);
module.exports = router;