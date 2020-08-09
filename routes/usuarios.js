//rutas para crear usurios
const express = require('express');
const router = express.Router();
const usuarioControler =  require('../controller/usuarioController');

//crear un usuario
//api/usuarios
router.post('/', () =>{
    console.log('creando usuario');
});

module.exports = router;