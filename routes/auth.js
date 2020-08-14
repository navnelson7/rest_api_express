//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controller/authController');
//crear un usuario
//api/auth
router.post('/', 
    [
        check('email', 'Agregar un correo valido').isEmail(),
        check('password','El password debe ser minio de 6 caracteres').isLength({min:6})
    ],
    authController.autenticarUsuario
)

module.exports = router;