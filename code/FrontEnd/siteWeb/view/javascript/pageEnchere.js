const view = {

    nom: document.querySelector("#nom_parcelle"),
    createur: document.querySelector("#nom_createur"),
    description: document.querySelector("#description_para"),

    setNom: function (nom) {
        this.nom.textContent = nom;
    },

    setCreateur: function (createur) {
        this.createur.textContent = createur;
    },

    setDescription: function (description) {
        this.description.textContent = description;
    }

}

function connectToWebSocket(idEnchere) {

    idEnchere = parseInt(idEnchere);

    let websocket = new WebSocket("ws://127.0.0.1:8080");

    websocket.sendObject = function(obj) {
        this.send(JSON.stringify(obj));
    }


    websocket.onopen = (event) => {
        console.log("Connexion au websocket");
        websocket.sendObject({ cmd: "JOIN", param: idEnchere });
    }

    websocket.onmessage = (message) => {
        
    }

    return websocket;
}


window.onload = async function() {

    let id = new URLSearchParams(window.location.search).get('id');

    let enchere = await Enchere.getEnchereById(id);
    
    view.setNom(enchere.nom);
    view.setCreateur(enchere.joueur);
    view.setDescription(enchere.description);

    connectToWebSocket(id);
    
}