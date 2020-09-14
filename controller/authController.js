const Usuario = require("../models/Usuario");
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async(req, resp) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return resp.status(400).json({ errores: errores.array() });
    }
    //extaer el email y password
    const { email, password } = req.body;
    try {
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return resp.status(400).json({ msg: 'El usuario no existe' });
        }
        //revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return resp.status(400).json({ msg: 'Password Incorrecto' });
        }

        //si todo es correcto 
        //crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            //mensaje de confirmacion
            resp.json({ token });
        });
    } catch (error) {
        console.log(error);
    }
}

//obtiene que usuairo esta autenticado
exports.usuarioAutenticado = async(req, resp) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        resp.json({usuario});
    } catch (error) {
        console.log(error);
        resp.status(500).json({ msg: 'Hubo un error' });
    }
}