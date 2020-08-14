const Usuario = require("../models/Usuario");
const bcryptjs = require ('bcryptjs');
const  { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, resp) =>{
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return resp.status(400).json({errores: errores.array()});
    }
    //extaer el email y password
    const { email, password } = req.body;
    try {
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario){
            return resp.status(400).json({ msg: 'El usuario no existe'});
        }
    } catch (error) {
        console.log(error);
    }
}