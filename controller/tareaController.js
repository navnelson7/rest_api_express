const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//crear una nueva tarea
exports.crearTarea = async(req, resp) => {
    //Revisar si hay errores
    const errores = validationResult(req.body);
    if (!errores.isEmpty()) {
        return resp.status(400).json({ errores: errores.array() })
    }

    //extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;
    try {
        const existeproyecto = await Proyecto.findById(proyecto);
        if (!existeproyecto) {
            return resp.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        //revisar si el proyecto actual pertenece al usuario autenticado
        if (existeproyecto.creador.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: 'No Autorizado' });
        }

        //creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        resp.json({ tarea });

    } catch (error) {
        console.log(error);
        resp.status(500).send('hubo un error');
    }
}

//obtiene las tareas por proyecto
exports.obtenerTareas = async(req, resp) => {
    try {
        //extraer el proyecto
        const { proyecto } = req.body;
        const existeproyecto = await Proyecto.findById(proyecto);
        if (!existeproyecto) {
            return resp.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        //revisar si el rpoyecto actual pertenece al usuario autenticado
        if (existeproyecto.creador.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: 'No Autorizado' });
        }

        //obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        resp.json({ tareas });

    } catch (error) {
        console.log(error);
        resp.status(500).send('Hubo un error');
    }
}

exports.actualizarTarea = async(req, resp) => {
    try {
        //extraer el proyecto
        const { proyecto, nombre, estado } = req.body;
        //si la tarea existe
        let tareaExiste = await Tarea.findById(req.params.id);
        if (!tareaExiste) {
            return resp.status(404).json({ msg: 'No existe la tarea' });
        }

        //extraer el proyecto
        const existeproyecto = await Proyecto.findById(proyecto);


        //revisar si el proyecto actual pertenece al usuario autenticado
        if (existeproyecto.creador.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: "No autorizado" })
        }

        const nuevaTarea = {};
        if (nombre) {
            nuevaTarea.nombre = nombre;
        }

        if (estado) {
            nuevaTarea.estado = estado;
        }

        //guardar la taraea
        tareaExiste = await Tarea.findByIdAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
        resp.json({ tareaExiste });
    } catch (error) {
        console.log(error);
        resp.status(500).send('Hubo un error');
    }
}

//elmina una tarea
exports.eliminarTarea = async(req, resp) => {
    try {
        //extraer el proyecto
        const { proyecto } = req.body;
        //si la tarea existe
        let tareaExiste = await Tarea.findById(req.params.id);
        if (!tareaExiste) {
            return resp.status(404).json({ msg: 'No existe la tarea' });
        }

        //extraer el proyecto
        const existeproyecto = await Proyecto.findById(proyecto);


        //revisar si el proyecto actual pertenece al usuario autenticado
        if (existeproyecto.creador.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: "No autorizado" })
        }


        //eliminar la taraea
        await Tarea.findByIdAndRemove({ _id: req.params.id });
        resp.json({ msg: 'Tarea Elminada' })

    } catch (error) {
        console.log(error);
        resp.status(500).send('Hubo un error');
    }
}