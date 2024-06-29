const options = {
  headers: { 'Content-Type': 'application/json'}
};

function signIn(){

let pseudo = document.getElementById("username_signin").value;
let email = document.getElementById("mail").value;
let prenom= document.getElementById("first_name").value;
let nom = document.getElementById("last_name").value;
let adresse = document.getElementById("adresse").value;
let codepostal = document.getElementById("codePostal").value;
let ville = document.getElementById("ville").value;
let password = document.getElementById("password_signin").value;
let passwordconf = document.getElementById("confirm_password").value;


const articles = JSON.stringify( { 
    pseudo,
    email,
    prenom,
    nom,
    adresse,
    codepostal,
    ville,
    password
});

if (password.match( /[0-9]/g) &&  password.match( /[A-Z]/g) && password.match(/[a-z]/g) && password.length >= 8){
  document.getElementById("password_nogood").style.display = "none";
}else {
  document.getElementById("password_nogood").style.display = "flex";
}

if (password!=passwordconf){
  document.getElementById("erreur_password").style.display = "flex";
}else {
  document.getElementById("erreur_password").style.display = "none";
}
if(pseudo==""){
  document.getElementById("erreur_pseudo").style.display = "flex";
}else {
  document.getElementById("erreur_pseudo").style.display = "none";
}
if(email==""){
  document.getElementById("erreur_mail").style.display = "flex";
}else{
  document.getElementById("erreur_mail").style.display = "none";
}
if (nom==""){
  document.getElementById("erreur_nom").style.display = "flex";
}else{
  document.getElementById("erreur_nom").style.display = "none";
}
if (prenom==""){
  document.getElementById("erreur_prenom").style.display = "flex";
}else{
  document.getElementById("erreur_prenom").style.display = "none";
}
if (ville==""){
  document.getElementById("erreur_ville").style.display = "flex";
}else{
  document.getElementById("erreur_ville").style.display = "none";
}
if (codepostal==""){
  document.getElementById("erreur_codepostal").style.display = "flex";
}else{
  document.getElementById("erreur_codepostal").style.display = "none";
}
if (adresse==""){
  document.getElementById("erreur_adresse").style.display = "flex";
}else{
  document.getElementById("erreur_adresse").style.display = "none";
}

if(password=passwordconf && pseudo!="" && email!="" && prenom!="" && nom!="" && adresse!="" && codepostal!="" && codepostal!="") {
  axios.post('http://api-mineplace.devistorm.fr/api/users/signup', articles,options)
  .then((result) => {
  
    // Le résultat est dans result.data
    console.log("test");
    console.log(result.data);   
    //truc a faire avec le cookie
  
  
  })
  .catch((error) => {
    // gérer l'erreur
    console.log(error);
    
  })
}
}