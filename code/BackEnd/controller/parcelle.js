const Parcelle = require('../models/parcelle');
const Enchere = require('../models/enchere');

exports.getAllParcelles = (req, res, next) => {

    Parcelle.getParcelles()
        .then((result) => res.status(200).json(result))
        .catch((err) => { res.status(err.code).json({ message: err.error }) });

}

exports.getMyParcelles = (req, res, next) => {

    Parcelle.getParcelleByOwner(req.auth.pseudo)
        .then((result) => res.status(200).json(result))
        .catch((err) => { res.status(err.code).json({ message: err.error }) });   

}

exports.getParcelle = (req, res, next) => {

    Parcelle.getParcelleById(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => { res.status(err.code).json({ message: err.error }) });
        
}

exports.sellParcelle = (req, res, next) => {

    Enchere.createEnchere(req.auth.pseudo, req.params.id, req.body)
        .then((result) => res.status(200).json({ message: "Enchère créé avec succès.", id: result.idenchere, fin: result.datefin}))
        .catch((err) => { console.log(err); res.status(err.code).json({ message: err.error }) });

}
