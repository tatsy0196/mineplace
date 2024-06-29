const express = require('express');

const router = express.Router();

const joueurCtrl = require('../controller/joueur');

router.post('/signup', joueurCtrl.signup);
router.post('/login', joueurCtrl.login);


module.exports = router;