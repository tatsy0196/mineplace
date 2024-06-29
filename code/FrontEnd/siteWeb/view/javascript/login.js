function login(){
    
    let pseudo = document.getElementById("username_login").value;
    let password = document.getElementById("password_login").value;

    if(pseudo==""){
      document.getElementById("erreur_pseudo_login").style.display = "flex";
    }else {
      document.getElementById("erreur_pseudo_login").style.display = "none";
    }
    if (password==""){
      document.getElementById("password_nogood_login").style.display = "flex";
    }else {
      document.getElementById("password_nogood_login").style.display = "none";
    }

    axios.post('http://api-mineplace.devistorm.fr/users/login'+pseudo+"&"+password)
    .then((result) => {
        let model = document.querySelector(".connexion");

      // Le résultat est dans result.data
      console.log("test");  
      console.log(result.data)

    //creation d'un cookie de session 
          Cookies.set('session', result.data.sessionId, { expires: 24 * 60 * 60 });
    //stockage de la session en locale 
          localStorage.setItem('session', result.data.sessionId);
    })
    .catch((error) => {
      // gérer l'erreur
      console.log(error);
      document.getElementById("connexionError").style.visibility = "visible";

    })

}