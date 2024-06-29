
function modifJoueur(){


    let model = document.querySelector(".modif");
    
    const articles = { 
        pseudo:model.querySelector(".pseudo").textContent,
        email:model.querySelector(".email").textContent,
        prenom:model.querySelector(".prenom").textContent,
        nom:model.querySelector(".nom").textContent,
        adresse:model.querySelector(".adresse").textContent,
        codePostal:model.querySelector(".codePostal").textContent,
        ville:model.querySelector(".ville").textContent,
        password:model.querySelector(".password").textContent
    };
    axios.post('http://api-mineplace.devistorm.fr/users/modif', articles)
    .then((result) => {
    
      // Le résultat est dans result.data
      console.log("test");  
    //truc a faire avec le cookie
    })
    .catch((error) => {
      // gérer l'erreur
      console.log(error);
    })
    } 