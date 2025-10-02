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

async function ajouterArticle(title, description, content) {

  const response = await fetch("http://localhost:3000/articles", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, description, content })
  })

  const data = await response.json()
}

// formulaire et stockage des données
document.getElementById("formAjoutArticle").addEventListener("submit", async function (event) {
  event.preventDefault()
  const titre = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const contenu = document.getElementById("content").value;

  if (!titre || !description || !contenu) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  console.log(titre, description, contenu)

  await ajouterArticle(titre, description, contenu)

  window.location.href = "blog.html"

});

