const CONFIG = {
    secret: 'mi-llave-secreta',
    crypto: {
        algorithm: 'aes-256-cbc',
        password: 'mi-contraseña-secreta',
    },
    bcrypt: {
        saltRounds: 10,
    },
};
  
module.exports = CONFIG;