const express = require('express');
const router = express.Router();
const tareaController = require('../controller/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator')

//crear un atarea
//api/tareas
router.post('/',
    auth, [
        check('nombre', 'El nombre es obligatorio').notEmpty().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').notEmpty().isEmpty()
    ],
    tareaController.crearTarea
);
//obtener tareas
router.get('/',
    auth,
    tareaController.obtenerTareas
);
//actualizar tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);

module.exports = router;