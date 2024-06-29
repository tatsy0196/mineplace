function btn_login_onclick(){
  opacity_show();
  popup_login_show();
}

function btn_signin_onclick(){
  popup_login_hide();
  popup_signin_show();
}

function btn_return_onclick(){
  popup_login_show();
  popup_signin_hide();
}

function btn_cancel_onclick(){
  popup_login_hide();
  popup_signin_hide();
  opacity_hide();
  try{
  document.getElementById("popup_modif_name").style.display = "none";
  document.getElementById("popup_modif_mdp").style.display = "none";
  document.getElementById("popup_paypal").style.display = "none";
  document.getElementById("popup_paypal_notif").style.display = "none";

  
  }catch(error){}
  
}

function btn_modif_name_onclick(){
  opacity_show();
  popup_modif_name_show();
}

function btn_modif_mdp_onclick(){
  opacity_show();
  popup_modif_mdp_show();
}

function opacity_hide(){
  document.getElementsByTagName("header")[0].classList.remove("opacity");
  document.getElementsByTagName("main")[0].classList.remove("opacity");
  document.getElementsByTagName("footer")[0].classList.remove("opacity");
}

function opacity_show(){
  document.getElementsByTagName("header")[0].classList.add("opacity");
  document.getElementsByTagName("main")[0].classList.add("opacity");
  document.getElementsByTagName("footer")[0].classList.add("opacity");
}

function popup_modif_name_show() {
  document.getElementById("popup_modif_name").style.display = "flex";
}

function popup_modif_mdp_show() {
  document.getElementById("popup_modif_mdp").style.display = "flex";
}

function popup_login_show() {
  document.getElementById("popup_login").style.display = "flex";
}

function popup_login_hide() {
  document.getElementById("popup_login").style.display = "none";
}

function popup_signin_show() {
  document.getElementById("popup_signin").style.display = "flex";
}

function popup_signin_hide() {
  document.getElementById("popup_signin").style.display = "none";
}

function btn_paypal_onclick(){
  opacity_show();
  popup_paypal_show();
}

function popup_paypal_show() {
  document.getElementById("popup_paypal").style.display = "flex";
}

function popup_paypal_notif_show() {
  document.getElementById("popup_paypal_notif").style.display = "flex";
}