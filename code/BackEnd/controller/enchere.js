const Enchere = require('../models/enchere');

exports.getAllEncheres = (req, res, next) => {

    Enchere.getAllEncheres()
        .then((result) => res.status(200).json(result))
        .catch((err) => { res.status(err.code).json({message: err.error}) });

}

exports.getEnchere = (req, res, next) => {

    Enchere.getEnchereById(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => { res.status(err.code).json({message: err.error}) });       

}

exports.mise = (req, res, next) => {

    console.log(req.auth);

    Enchere.miseOnEnchere(req.auth.pseudo, req.params.id, req.body.prix)
        .then((result) => res.status(200).json({ message: "La mise a bien été prise en compte !"}))
        .catch((err) => { console.log(err); res.status(err.code).json({message: err.error}) });     

}
