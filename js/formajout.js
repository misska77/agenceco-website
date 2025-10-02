// Menu burger
const menu = document.querySelector(".nav-links");
const btnToggle = document.querySelector(".toggle");
const iconToggle = document.querySelector(".fa-bars");

btnToggle.onclick = function () {
  if (iconToggle.classList.contains("fa-bars")) {
    iconToggle.classList.replace("fa-bars", "fa-times");
    menu.classList.toggle("hidden");
  } else {
    iconToggle.classList.replace("fa-times", "fa-bars");
    menu.classList.toggle("hidden");
  }
}

// formulaire et stockage des données
document.getElementById("save-btn").addEventListener("click", function () {
  const titre = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const contenu = document.getElementById("content").value;

  if (!titre || !description || !contenu) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  let article = JSON.parse(localStorage.getItem("articles")) || [];

  article.push({
    titre: titre,
    description: description,
    contenu: contenu,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("article", JSON.stringify(article));

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("content").value = "";
});

