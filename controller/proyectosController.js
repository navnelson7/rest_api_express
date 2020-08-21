const Proyecto = require('../models/Proyecto');
exports.crearProyecto = async (req, resp) => {
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