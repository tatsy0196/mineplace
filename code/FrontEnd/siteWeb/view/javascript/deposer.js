function deposer() {
    let pseudo = document.getElementById("nickname").value;
    let parcelle = document.getElementById("parcelle").value;
    let image = document.getElementsByClassName("image").value;
    let description = document.getElementById("description_deposer_annonce").value;
    let prixd = document.getElementById("prixd").value;

    axios.get('http://api-mineplace.devistorm.fr/api/users/signup'+pseudo+"&"+parcelle+"&"+description+"&"+prixd+"&"+image)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        // gérer l'erreur
        console.log(error);
      })
}