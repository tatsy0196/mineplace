const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authCtrl = require('./controller/auth');

const db = require('./database');
const websocket = require('./websockets');

const app = express();

const parcelleRoute = require('./routes/parcelle');
const enchereRoute = require('./routes/enchere');
const joueurRoute = require('./routes/joueur');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use('/api/parcelles', parcelleRoute);
app.use('/api/encheres', enchereRoute);
app.use('/api/users', joueurRoute);

app.use('/api/admin', authCtrl.verifyAuth, (req, res, next) => {
    res.status(200).send("Bonjour");
})


module.exports = app;