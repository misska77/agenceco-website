// Menu burger
const menu = document.querySelector(".nav-links");//On récupère le menu navbar
const btnToggle = document.querySelector(".toggle");// on récupère la div qui contient les boutons 
const iconToggle = document.querySelector(".fa-bars");// on récupère le bouton barres

btnToggle.onclick = function () {//defini ce qui se passe quand l'utilisateur clic sur le bouton barre ou croix
  if (iconToggle.classList.contains("fa-bars")) {//on verifie que l'icone actuelle est l'icone barre si oui le menu est fermé on va donc l'ouvrir
    iconToggle.classList.replace("fa-bars", "fa-times");//on remplace donc l'icone bar par l'icone croix
    menu.classList.toggle("hidden");// selon l'état on affiche ou on enleve le menu
  } else {//sinon le contraire 
    iconToggle.classList.replace("fa-times", "fa-bars");
    menu.classList.toggle("hidden");
  }
}