const EXPRESS = require('express');
const SESSION = require('express-session');
const APP = EXPRESS();
const ROUTER = require('./routes');
const COOKIE_PARSER = require('cookie-parser');


APP.use(COOKIE_PARSER());
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));
APP.use(EXPRESS.static('public'));
APP.set('view engine', 'ejs');

APP.use(SESSION({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

APP.use(ROUTER);

const PORT = 3000;
APP.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});