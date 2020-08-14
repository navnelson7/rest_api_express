const Usuario = require("../models/Usuario");
const bcryptjs = require ('bcryptjs');
const  { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

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
        //crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn:3600
        }, (error, token)=>{
            if(error) throw error;
            //mensaje de confirmacion
            resp.json({token});
        });

        
    } catch (error) {
        console.log(error);
        resp.status(400).send('Hubo un error');
    }
}