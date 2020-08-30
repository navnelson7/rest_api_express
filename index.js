const express = require('express');
const conectarDB = require('./config/db');
//creando el servidor
const app = express();

//puerto de la app
const PORT = process.env.PORT || 4000;

//conectar a la bd
conectarDB();


//habilitar express.json
app.use(express.json({ extended: true }));

//importar las rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//arrancar la app
app.listen(PORT, () => {
    console.log(`el servidor esta funcionan el puerto ${PORT}`);
})