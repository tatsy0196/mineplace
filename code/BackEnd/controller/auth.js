const jwt = require('jsonwebtoken');
const config = require('../config');


exports.verifyAuth = (req, res, next) => {

    try {
        const token = req.cookies.token;
        const token_decode = jwt.verify(token, config.jwt_secret);
        req.auth = token_decode;

        next();
    }
    catch(error) {
        res.status(403).json({ error: "Accès non autorisé."});
    }

}