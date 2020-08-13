//rutas para crear usurios
const express = require('express');
const router = express.Router();
const usuarioController =  require('../controller/usuarioController');
const {check} = require('express-validator');
//crear un usuario
//api/usuarios
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agregar un correo valido').isEmail(),
        check('password','El password debe ser minio de 6 caracteres').isLength({min:6})
    ],
    usuarioController.crearUsuario
)

module.exports = router;