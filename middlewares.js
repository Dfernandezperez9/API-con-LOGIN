const JWT = require('jsonwebtoken');
const CONFIG = require('./config.js');

const GENERAR_TOKEN = (user) => {
    const PAYLOAD = { id: user.id, username: user.username };
    const TOKEN = JWT.sign(PAYLOAD, CONFIG.secret, { expiresIn: '1h' });
    return TOKEN;
};

const VERIFICAR_TOKEN = (req, res, next) => {
    const TOKEN = req.cookies['x-access-token'];
    if (!TOKEN) {
        return res.status(401).send(`<h1>Token no proporcionado</h1> <a href="/">Volver</a>`);
    }
    JWT.verify(TOKEN, CONFIG.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send(`<h1>Token inválido</h1> <a href="/">Volver</a>`);
        }
        req.user = decoded;
        next();
    });
};

module.exports = { GENERAR_TOKEN, VERIFICAR_TOKEN };