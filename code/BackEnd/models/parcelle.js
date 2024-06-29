const db = require('../database');

class Parcelle {

    static async getParcelles() {

        let result = await db.query("SELECT * FROM parcelle", []);
        if(result.rowCount === 0) throw { code: 404, error: "Aucune parcelle disponible"};
        return result.rows;

    }

    static async getParcelleById(id) {

        let result = await db.query("SELECT * FROM parcelle WHERE idparcelle = $1", [id]);
        if(result.rowCount === 0) throw { code: 404, error: "Parcelle introuvable"};
        return result.rows[0];

    }

    static async getParcelleByOwner(pseudo) {
        let result = await db.query("SELECT * FROM parcelle WHERE Joueur = $1", [pseudo]);
        if(result.rowCount === 0) throw { code: 404, error: "Aucune parcelle disponible"};
        return result.rows;
    }

}

module.exports = Parcelle;