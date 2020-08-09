const mongoose = require('mongoose');
const { stringify } = require('querystring');
const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: string,
        required: true,
        trim: true
    },
    email: {
        type: string,
        required:true,
        trim: true,
        unique: true
    },
    password: {
        type: string,
        required: true,
        trim: ture
    },
    registro: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Usuario', UsuariosSchema);