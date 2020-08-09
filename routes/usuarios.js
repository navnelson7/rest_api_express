//rutas para crear usurios
const express = require('express');
const router = express.Router();
const usuarioController =  require('../controller/usuarioController');

//crear un usuario
//api/usuarios
router.post('/', 
    usuarioController.crearUsuario
)

module.exports = router;