const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')
exports.crearProyecto = async(req, resp) => {


        //revisar si hay errores
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return resp.status(400).json({ errores: errores.array() });
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
exports.obtenerProyectos = async(req, resp) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });
        resp.json({ proyectos });
    } catch (error) {
        console.log(error);
        resp.status(500).send('Hubo un error');
    }
}


//actualiza un proyecto
exports.actualizaProyecto = async(req, resp) => {
    const errores = validationResult(req);
    //revisando si hay errores
    if (!errores.isEmpty()) {
        return resp.status(400).json({ errores: errores.array() });
    }
    //extraer la informacion del rpoyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};
    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {
        //revisar el id 
        let proyecto = await Proyecto.findById(req.params.id);

        //revisar si el proyecto existe o no
        if (!proyecto) {
            return resp.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: 'No Autorizaado' });
        }


        //actualizar
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true });
        resp.json({ proyecto });

    } catch (error) {
        console.log(error);
        resp.status(500).send('Error en el servidor');
    }
}

//elimina u nproyecot por su id
exports.eliminarProyecto = async(req, resp) => {
    try {
        //revisar el id 
        let proyecto = await Proyecto.findById(req.params.id);

        //revisar si el proyecto existe o no
        if (!proyecto) {
            return resp.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: 'No Autorizaado' });
        }
        //eliminar el proyecto
        await Proyecto.findByIdAndRemove({ _id: req.params.id });
        resp.json({ msg: 'Proyecto elminado' });
    } catch (error) {
        console.log(error);
        console.log(500).send('Error en el servidor');
    }
}