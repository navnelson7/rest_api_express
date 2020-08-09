const Usuario = require("../models/Usuario");

exports.crearUsuario = async (req, resp) => {
    try {
        let usuario;

        //crea un nuevo usuario
        usuario = new Usuario(req.body);

        //guarda un nuevo usuario
        await usuario.save()
        resp.send("usuario creado correctamente");
    } catch (error) {
        console.log(error);
        resp.status(400).send('Hubo un error');
    }
}