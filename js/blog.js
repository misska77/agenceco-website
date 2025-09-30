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

async function getArticles() {
  // recuperation du Token dans le localStorage
  const token = localStorage.getItem("token")
  let response = await fetch("http://localhost:3000/articles", {
    headers: { "Authorization": `Bearer ${token}` }
  })
  //si token présent dans localStorage - l'utilisateur est connecté au serveur - l'API retourne la liste des articles
  let listeArticles = await response.json()
  if (response.ok) {
    return listeArticles
  }

  throw new Error(listeArticles.message || "Impossible de contacter le serveur")
}

// gestion du bouton supprimer un article
async function supprimerArticle(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/articles/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (response.ok) {
    return true; // suppression OK
  } else {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Erreur inconnue lors de la suppression");
  }
}

// affichage et creation des balises et boutons
function afficherArticles(listeArticles) {
  const divConteneurActualites = document.querySelector('.conteneurActualites');
  divConteneurActualites.innerHTML = "";

  for (let article of listeArticles) {
    const divArticle = document.createElement("div");
    divArticle.classList.add("ficheArticle");

    const title = document.createElement("h3");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.textContent = article.description;

    const content = document.createElement("p");
    content.textContent = article.content;

    const footer = document.createElement("div");
    footer.classList.add("pied-fiche");

    const publicationDate = document.createElement("p");
    publicationDate.classList.add("date");
    publicationDate.textContent = article.publicationDate;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    // Bouton Modifier
    const boutonModifier = document.createElement("button");
    boutonModifier.type = "button";
    boutonModifier.textContent = "Modifier";
    boutonModifier.classList.add("btn-modifier");
    boutonModifier.addEventListener("click", () => {
      window.location.href = `formarticle.html?id=${article.id}`;
    });

    // Bouton Supprimer (appel API)
    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.type = "button";
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.classList.add("btn-supprimer");
    boutonSupprimer.addEventListener("click", async () => {
      if (!confirm("Confirmer la suppression de cet article ?")) return;
      try {
        // appel API
        await supprimerArticle(article.id);
        // suppression visuelle du bloc
        divArticle.remove();
      } catch (err) {
        alert("Erreur suppression : " + (err.message || "inconnue"));
      }
    });

    // rattachement enfants au parent
    actions.appendChild(boutonModifier);
    actions.appendChild(boutonSupprimer);

    footer.appendChild(publicationDate);
    footer.appendChild(actions);

    divArticle.appendChild(title);
    divArticle.appendChild(description);
    divArticle.appendChild(content);
    divArticle.appendChild(footer);

    divConteneurActualites.appendChild(divArticle);
  }
}
  // afficher le bouton ajouter un article que si le token est present dans le localStorage
function afficherBoutonAjouter() {
  const token = localStorage.getItem("token");
  if (!token) return; // si pas token, on ne montre pas

  const container = document.querySelector('.conteneurActualites');
  // on ne fait pas container.innerHTML = "" ici pour éviter de supprimer les articles
  // si jamais on rappelle cette fonction après affichage.
  // si besoin de position, on insère le bouton avant le container
  if (!document.querySelector('.btn-ajouter')) {
    const boutonAjouter = document.createElement("button");
    boutonAjouter.textContent = "Ajouter une actualité";
    boutonAjouter.classList.add("btn-ajouter");
    boutonAjouter.type = "button";
    boutonAjouter.addEventListener("click", () => {
      window.location.href = "formarticle.html";
    });
    container.parentNode.insertBefore(boutonAjouter, container);
  }
}

  async function main() {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "login.html"
      return
    }

    try {
      afficherBoutonAjouter()
      let listeArticles = await getArticles()
      afficherArticles(listeArticles)
    } catch (error) {
      console.error("Erreur :", error)
      alert("Impossible de charger les articles")
    }
  }

  main()

