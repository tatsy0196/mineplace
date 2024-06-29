function toggleList(id) {
  var list = document.getElementById(id);
  var triangle = list.previousElementSibling.querySelector(".triangle");
  if (list.style.display === "none") {
    list.style.display = "flex";
    triangle.classList.add("triangle-down");
  } else {
    list.style.display = "none";
    triangle.classList.remove("triangle-down");
  }
}

{
  test: () => {

  }
}

function popup_login(event){
  var popup =   document.getElementById("popup_login");
  if(popup.style.display === "none"){
  document.getElementById("popup_login").style.display="flex";
  document.getElementsByTagName("header")[0].classList.add("opacity");
  document.getElementsByTagName("section")[0].classList.add("opacity");
  document.getElementsByTagName("footer")[0].classList.add("opacity");
}else{
  document.getElementById("popup_login").style.display="none";
  document.getElementsByTagName("header")[0].classList.remove("opacity");
  document.getElementsByTagName("section")[0].classList.remove("opacity");
  document.getElementsByTagName("footer")[0].classList.remove("opacity");
}
}