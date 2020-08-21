const Proyecto = require('../models/Proyecto');
const { validationResult} = require('express-validator')
exports.crearProyecto = async (req, resp) => {


    //revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return resp.status(400).json({errores: errores.array()});
    }
    try {
        //crear nuevo proyecto 
        const proyecto = new Proyecto(req.body);

        //guardar el creador via JWT
        proyecto.creador = req.usuario.id;

        //guardar el proyecto
        await proyecto.save();
        resp.json(proyecto);
    } catch (error) {
        console.log(error);
        resp.status(500).send("Hubo un error");
    }
}
//obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async(req,resp) => {
    try {
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado:-1});
        resp.json({proyectos});
    } catch (error) {
        console.log(error);
        resp.status(500).send('Hubo un error');
    }
}


//actualiza un proyecto
exports.actualizaProyecto = async(req, resp) =>{
    //revisando si hay errores
    if (!errores.isEmpty()) {
        return resp.status(400).json({ errores: errores.array() });
    }
    //extraer la informacion del rpoyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        
    } catch (error) {
        console.log(error);
        resp.status(500).send('Error en el servidor');
    }
}