const express = require('express');
const router = express.Router();
const tareaController = require('../controller/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator')

//crear un atarea
//api/tareas
router.post('/',
    auth, [
        check('nombre', 'El nombres es obligatorio').notEmpty().isEmpty()
    ],
    tareaController.crearTarea
);

module.exports = router;