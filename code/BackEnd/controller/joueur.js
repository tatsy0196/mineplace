const Joueur = require('../models/joueur');
const jwt = require('jsonwebtoken');

const config = require('../config');

exports.signup = (req, res, next) => {

    console.log(req.body);

    // TODO: Vérifier qu'il y a tout
    Joueur.createJoueur(req.body)
        .then((result) => res.status(200).json({ message: "Le joueur a bien été créé."}))
        .catch((err) => { res.status(err.code).json({message: err.error}) });

}

exports.login = (req, res, next) => {

    // TODO: Vérifier qu'il y a tout
    Joueur.loginJoueur(req.body.pseudo, req.body.password)
        .then((result) => {
            // On créé le token
            let token = jwt.sign(result, config.jwt_secret, { expiresIn: '48h' });

            res.cookie('token', token, { httpOnly: false });

            res.status(200).json({
                token: token
            });
        })
        .catch((err) => { res.status(err.code).json({message: err.error}) });
}