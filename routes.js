const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const MIDDLEWARE_AUTENTICACION = require('./middlewares.js');
const USERS = require('./users.js');
const AXIOS = require('axios');

ROUTER.get('/', (req, res) => {
    res.render('index', { title: 'Inicio de sesión' });
});

ROUTER.post('/login', (req, res) => {
    const { username, password } = req.body;
    const USER = USERS.find((user) => user.username === username && user.password === password);
    if (!USER) {
        return res.status(401).send(`<h1>Credenciales invalidas</h1> <a href="/">Volver</a>`);
    }
    const TOKEN = MIDDLEWARE_AUTENTICACION.GENERAR_TOKEN(USER);
    res.cookie('x-access-token', TOKEN);
    res.redirect('/characters');
});

ROUTER.get('/characters', MIDDLEWARE_AUTENTICACION.VERIFICAR_TOKEN, async (req, res) => {
    const mensajeBienvenida = `Bienvenido ${req.user.username}`;
    const response = await AXIOS.get('https://rickandmortyapi.com/api/character/');
    const data = response.data;
  
    res.render('characters', {
      mensajeBienvenida,
      personajes: data
    });
  });

  ROUTER.get('/search', MIDDLEWARE_AUTENTICACION.VERIFICAR_TOKEN, (req, res) => {
    res.render('search', {
      title: 'Buscar personaje'
    });
  });

  ROUTER.get('/character/:id', MIDDLEWARE_AUTENTICACION.VERIFICAR_TOKEN, async (req, res) => {
    const nombre = req.params.id;
    const response = await AXIOS.get(`https://rickandmortyapi.com/api/character/?name=${nombre}`);
    const data = response.data;
    
    res.render('character', {
      personaje: data,
    });
  });

ROUTER.get('/dashboard', MIDDLEWARE_AUTENTICACION.VERIFICAR_TOKEN, (req, res) => {
  res.redirect('/characters');
});

ROUTER.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.clearCookie('x-access-token');
            res.redirect('/');
        }
    });
});


ROUTER.post('/logout', (req, res) => {
    req.session.destroy();
    res.send({ message: 'Sesión cerrada' });
});

module.exports = ROUTER;