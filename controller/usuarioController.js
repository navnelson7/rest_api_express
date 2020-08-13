const Usuario = require("../models/Usuario");

exports.crearUsuario = async (req, resp) => {
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

        //guarda un nuevo usuario
        await usuario.save()
        resp.json({msg: 'Usuario Creado correctamente'});
    } catch (error) {
        console.log(error);
        resp.status(400).send('Hubo un error');
    }
}