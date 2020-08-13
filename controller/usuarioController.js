const Usuario = require("../models/Usuario");
const bcryptjs = require ('bcryptjs');
const  { validationResult } = require('express-validator');

exports.crearUsuario = async (req, resp) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty()){
        return resp.status(400).json({errores: errores.array()})
    }

    //extraer email y password
    const {email, password} = req.body;
    try {
        //validar que el usuario  registrado sea unico
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return resp.status(400).json({msg: 'El usuario ya existe'});
        }

        //crea un nuevo usuario
        usuario = new Usuario(req.body);
        //hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guarda un nuevo usuario
        await usuario.save()
        resp.json({msg: 'Usuario Creado correctamente'});
    } catch (error) {
        console.log(error);
        resp.status(400).send('Hubo un error');
    }
}