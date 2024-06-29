const db = require('../database');

class Joueur {

    static async createJoueur(infos) {

        await db.query("INSERT INTO Joueur (pseudo, email, prenom, nom, adresse, codepostal, ville, password) VALUES($1, $2, $3, $4, $5, $6, $7, crypt($8, gen_salt('bf')))", 
                            [infos.pseudo, infos.email, infos.prenom, infos.nom, infos.adresse, infos.codepostal, infos.ville, infos.password]);

    }

    static async loginJoueur(pseudo, password) {

        let result = await db.query("SELECT pseudo, email, prenom, nom FROM Joueur WHERE pseudo = $1 AND password = crypt($2, password)", 
                                    [pseudo, password]);

        if(result.rowCount === 0) throw { code: 403, error: "Pseudo ou mot de passe incorrect !"};
        return result.rows[0];
    }

}

module.exports = Joueur;