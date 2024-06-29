const WebSocketServer = require('ws');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Enchere = require('../models/enchere');

const wss = new WebSocketServer.Server({ 
    port: 8080
});

console.log("Démmarage du websocket Server !");

async function interpretCommand(data, client) {
    let cmd = data.cmd;
    let param = data.param;

    switch(cmd) {
        case 'LOGIN':
            let token = param;
            try {
                let decode = jwt.verify(token, config.jwt_secret);
                client.auth = decode;
                return "OK";
            }
            catch(err) {
                throw {error: "Erreur lors de la connexion."};
            }

        case 'JOIN':
            let id = parseInt(param);
            console.log(id);
            if(await Enchere.isEnchereExist(id)) {
                client.joinEnchere = id;
                return "OK";
            }
            else {
                throw {error: "Enchère inexistante"};
            }
        
        case 'MISE':
            try {
                if(client.auth) {
                    await Enchere.miseOnEnchere(client.auth.pseudo, client.joinEnchere, parseFloat(param));
                    return "OK";
                }
                else throw {error: "Opération non permises, connectez vous avant."};
            }
            catch (err) {
                throw err;
            }
        
        default:
            throw {error: "Commande inconnue"};
    }
}

wss.on("connection", (ws, req) => {
    console.log("WS: Nouveau client connecté ! ");

    ws.sendObject = function(obj) {
        this.send(JSON.stringify(obj));
    }

    ws.sendObject({ type: "HELLO" });

    ws.channelEnchere = 0;

    ws.on("message", async (data) => {
        try {
            data = JSON.parse(data.toString());
            console.log(data);
            ws.sendObject({ type: "REPONSE", message: await interpretCommand(data, ws)});
        }
        catch(err) {
            console.log(err);
            ws.sendObject({ type: "ERROR", message: err.error });
        }
    })

});

function broadcast(message) {
    wss.clients.forEach(c => c.sendObject(message));
}

Enchere.bindWebSocketClients(broadcast);

module.exports = wss;