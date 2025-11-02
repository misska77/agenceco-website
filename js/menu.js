// Menu burger
const menu = document.querySelector(".nav-links");
const btnToggle = document.querySelector(".toggle");
const iconToggle = document.querySelector(".fa-bars");
const navLinks = document.querySelectorAll(".nav-links a");

// Toggle menu
btnToggle.onclick = function () {
  const isOpen = iconToggle.classList.contains("fa-bars");

  if (isOpen) {
    iconToggle.classList.replace("fa-bars", "fa-times");
    menu.classList.add("is-visible"); // afficher le menu
  } else {
    iconToggle.classList.replace("fa-times", "fa-bars");
    menu.classList.remove("is-visible"); // cacher le menu
  }
};

// Fermer le menu automatiquement quand un lien est cliqué
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("is-visible");       // cacher le menu
    iconToggle.classList.replace("fa-times", "fa-bars"); // remettre l'icône burger
  });
});