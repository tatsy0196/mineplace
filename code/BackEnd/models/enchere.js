const db = require('../database');
const schedule = require('node-schedule');

class Enchere {

    static #socketBroadcast;

    static bindWebSocketClients(clients) {
        Enchere.#socketBroadcast = clients;
    }

    static sendbroadcast(message) {
        Enchere.#socketBroadcast(message);
    }




    static async getAllEncheres() {
        let result = await db.query("SELECT *, (SELECT count(*) FROM mise WHERE idenchere = E.idenchere) nbmises, (SELECT max(prix) FROM mise WHERE idenchere = E.idenchere) misemax FROM enchere E");
        if(result.rowCount === 0) throw { code: 404, error: "Aucune enchere disponible"};
        return result.rows;
    }


    static async getMisesOfEnchere(IdEnchere) {
        
        let result = await db.query("SELECT joueur, datemise, prix FROM mise WHERE IdEnchere = $1", [IdEnchere]);
        if(result.rowCount === 0) throw { code: 404, error: "Aucune mise disponible"};
        return result.rows;
        
    }

    static async getEnchereById(id) {

        let result = await db.query("SELECT *, (SELECT count(*) FROM mise WHERE idenchere = E.idenchere) nbmises, (SELECT max(prix) FROM mise WHERE idenchere = E.idenchere) misemax FROM enchere E INNER JOIN Parcelle P ON E.parcelle = P.idParcelle WHERE IdEnchere = $1", [id]);

        if(result.rowCount === 0) throw { code: 404, error: "Enchère inexistante"};

        try {
            result.rows[0].mise = await Enchere.getMisesOfEnchere(id);
        }
        catch(err) {
            result.rows[0].mises = null;
        }

        return result.rows[0];

    }

    static async isEnchereExist(id) {
        try {
            await Enchere.getEnchereById(id);
            return true;
        }
        catch(err) {
            return false;
        }
    }


    static async miseOnEnchere(pseudo, idEnchere, prix) {

        // On regarde que l'enchere existe et qu'elle est toujours en cours
        let enchere = await this.getEnchereById(idEnchere);

        if(enchere.gagnant !== null) throw ({ code: 400, error: "L'enchère n'est plus en cours"});

        // on regarde que la mise max est plus petite que la mise

        let max = 0;
        let pseudoMax = "";
        
        let result = await db.query("SELECT prix as misemax, joueur FROM Mise WHERE IdEnchere = $1 ORDER BY prix DESC LIMIT 1", [idEnchere]);

        if(result.rowCount > 0) {
            max = result.rows[0].misemax;
            pseudoMax = result.rows[0].joueur;
        } 

        if(prix <= max || prix <= enchere.prixdepart) 
            throw ({ code: 400, error: "La mise doit être supérieure à " + max });


        let resteAPayer = prix;

        // Si la dernière mise est faite par la même personne, alors on doit juste enlever la différence.
        if(pseudo === pseudoMax) {
            resteAPayer = prix - max;
        }

        // On regarde que le joueur a assez d'argent
        let solde = await db.query("SELECT Solde FROM Joueur WHERE pseudo = $1", [pseudo]);
        
        if(resteAPayer > solde.rows[0].solde) throw ({ code: 400, error: "Solde insuffisant." });

        await db.query("BEGIN");

        try {
            // On rend l'argent à la dernière personne qui a misé
            await db.query("UPDATE Joueur SET Solde = Solde + (SELECT Prix FROM Mise WHERE idenchere = $1 ORDER BY idmise DESC LIMIT 1) \
                        WHERE pseudo = (SELECT joueur FROM \
                        Mise WHERE idenchere = $1 ORDER BY idmise DESC LIMIT 1)", [idEnchere]);

            await db.query("UPDATE Joueur SET Solde = Solde - $1 WHERE pseudo = $2", [prix, pseudo]);

            await db.query("INSERT INTO Mise (idenchere, joueur, prix) VALUES ($1, $2, $3)", [idEnchere, pseudo, prix]);    

            await db.query("COMMIT");


            //console.log(websocket_clients);

            // On informe les clients connectés à l'enchère
            Enchere.sendbroadcast({ type: "MISE", date: Date.now(), joueur: pseudo, montant: prix});

            
        }
        catch(err) {
            console.log(err);
            await db.query("ROLLBACK");
            throw ({ code: 400, error: "Une erreur est survenue, l'opération a été annulée." });
        }
    }


    static async createEnchere(pseudo, idparcelle, infos) {

        // On doit d'abord vérifier que la parcelle appartient au joueur et qu'elle n'est pas déjà en vente

        let result = await db.query("SELECT joueur, onsale FROM Parcelle WHERE idparcelle = $1", [idparcelle]);
        if(result.rowCount === 0) throw { code: 400, error: "Cette parcelle n'existe pas." };

        let owner = result.rows[0].joueur;

        if(owner !== pseudo) throw { code: 400, error: "Le joueur ne possède pas cette parcelle" };
        if(result.rows[0].onsale == true) throw { code: 400, error: "La passerelle est déjà en vente" };

        // Si tout est bon, on créé l'enchère.

        await db.query("BEGIN");

        try {

            await db.query("UPDATE Parcelle SET OnSale = true WHERE idparcelle = $1", [idparcelle]);

            result = await db.query("INSERT INTO Enchere (Joueur, Parcelle, PrixDepart, DateFin, Description) VALUES ($1, $2, $3, (now() + interval '1 minutes' * $4), $5) RETURNING IdEnchere, DateFin"
                            , [pseudo, idparcelle, infos.prixdepart, infos.duree, infos.description]);

            await db.query("COMMIT");
        }
        catch(err) {
            await db.query("ROLLBACK");
            throw ({ code: 400, error: "Une erreur est survenue, l'opération a été annulée." }); 
        }

        // On créé la tâche à exécuter quand l'enchère sera terminé 
        schedule.scheduleJob(new Date(result.rows[0].datefin), function(id) {
            
            Enchere.endEnchere(id).catch(err => console.log(err));
            
        }.bind(null, result.rows[0].idenchere));

        return result.rows[0];
    }

    // Termine une enchère
    static async endEnchere(idEnchere) {

        console.log("FIN DE L'ENCHERE (ID: " + idEnchere + ")");

        // On récupère la meilleure mise
        let result = await db.query("SELECT prix as misemax, joueur FROM Mise WHERE IdEnchere = $1 ORDER BY prix DESC LIMIT 1", [idEnchere]);

        if(result.rowCount > 0) {

            let winner = result.rows[0].joueur;
            let montant = result.rows[0].misemax;

            console.log("LE GAGNANT EST " + winner + " AVEC UN MONTANT DE : " + montant);

            try {
                await db.query("BEGIN");

                result = await this.getEnchereById(idEnchere);
                let vendeur = result.joueur;

                // On met à jour les droits de propriété de la parcelle
                await db.query("UPDATE Parcelle SET OnSale = false, joueur = $1 WHERE IdParcelle = $2", [winner, result.parcelle]);

                // On crédite le vendeur
                await db.query("UPDATE Enchere SET gagnant = $1 WHERE idEnchere = $2", [winner, idEnchere]);
                await db.query("UPDATE Joueur SET solde = solde + $1 WHERE pseudo = $2", [montant, vendeur]);

                await db.query("COMMIT");
                this.sendbroadcast({ type: "END", gagnant: winner, montant: montant});
            }
            catch(err) {
                await db.query("ROLLBACK");
                console.log(err);
                throw ({ code: 400, error: "Une erreur est survenue, l'opération a été annulée." }); 
            }
              
        } 
        else {

            console.log("AUCUNE MISE, AUCUN CHANGEMENT DE PROPRIETAIRE");
            result = await this.getEnchereById(idEnchere);

            await db.query("UPDATE Parcelle SET OnSale = false WHERE IdParcelle = $1", [result.parcelle]);
            await db.query("UPDATE Enchere SET gagnant = $1 WHERE idEnchere = $2", [result.joueur, idEnchere]);

        }

        console.log("FIN PROCESSUS\n\n");
    }

}

module.exports = Enchere;