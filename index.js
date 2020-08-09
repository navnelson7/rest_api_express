const express = require('express');
const conectarDB = require('./config/db');
//creando el servidor
const app = express();

//puerto de la app
const PORT = process.env.PORT || 4000;

//conectar a la bd
conectarDB();
//definir la pagina principal
app.get('/', (req, res)=>{
    res.send('hola mundo')
});

//arrancar la app
app.listen(PORT, () =>{
    console.log(`el servidor esta funcionan el puerto ${PORT}`);
})