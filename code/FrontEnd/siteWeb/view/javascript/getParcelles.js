function getParcelles() {
    axios.get('http://api-mineplace.devistorm.fr/api/parcelles')
        .then((result) => {

            let container = document.querySelector("#parcelle-list");
            let model = document.querySelector(".article");

console.log(container);
            console.log(result.data);

            // Le résultat est dans result.data
            result.data.forEach(parcelle => {
                let card = model.cloneNode(true);
                card.style.display = "flex";

                console.log(card.querySelector('.nom').textContent);

                card.querySelector('.nom').textContent = parcelle.nom;
                //card.querySelector('.prix').textContent = parcelle.prix;
               card.querySelector('.image').textContent = parcelle.images || "default";
                card.querySelector('.createur').textContent = parcelle.joueur;

                card.querySelector('.biomes').textContent = parcelle.biomes || "default"; //TODO gérer les listes de biom 

                card.querySelector('.coordonnees').textContent = "X = " + parcelle.posx + " Z = " + parcelle.posy;
                card.querySelector('.taille').textContent = "50 X 50";


                container.append(card);

            });

        })
        .catch((error) => {
            // gérer l'erreur
            console.log(error);
        })

}
getParcelles();