const jwt = require('jsonwebtoken');

module.exports = function(req, resp, next){
    //ler el token del header
    const token = req.header('x-auth-token');

    //revisar si no hay token
    if(!token){
        return resp.status(401).json({msg:"No hay token valido"});
    }

    //validar token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        resp.status(401).json({msg:"token no valido"});
    }
}