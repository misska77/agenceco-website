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

// Actualité
async function getArticles() {
  console.log("getArticles")
  const token = localStorage.getItem("token")

  let response = await fetch("http://localhost:3000/articles", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  let listeArticles = await response.json();
  if (response.ok === true) {
    return listeArticles;
  }
  throw new Error(listeArticles.message || 'Impossible de contacter le serveur')
}

function afficherArticles(listeArticles) {
  const divConteneurActualites = document.querySelector('.conteneurActualites')
  console.log("afficherArticles")

  divConteneurActualites.innerHTML = "" // vider avant de recharger


  for (let i = 0; i < listeArticles.length; i++) {
    const article = listeArticles[i]

    const divArticle = document.createElement("div")
    divArticle.classList.add("ficheArticle")

    const title = document.createElement("h3")
    title.textContent = article.title

    const description = document.createElement("p")
    description.textContent = article.description

    const content = document.createElement("p")
    content.textContent = article.content

    const publicationDate = document.createElement("p")
    publicationDate.classList.add("date")
    publicationDate.textContent = article.publicationDate

    // --- Bouton Modifier ---
    const boutonModifier = document.createElement("button")
    boutonModifier.textContent = "Modifier"
    boutonModifier.classList.add("btn-modifier")
    boutonModifier.addEventListener("click", () => {
      window.location.href = `editArticle.html?id=${article.id}`
    })

    // --- Bouton Supprimer ---
    const boutonSupprimer = document.createElement("button")
    boutonSupprimer.textContent = "Supprimer"
    boutonSupprimer.classList.add("btn-supprimer")
    boutonSupprimer.addEventListener("click", async () => {
      if (confirm("Voulez-vous vraiment supprimer cette actualité ?")) {
        await supprimerArticle(article.id)
        main() // recharger la liste après suppression
      }
    })

    // Ajouter les éléments
    divArticle.appendChild(title)
    divArticle.appendChild(description)
    divArticle.appendChild(content)
    divArticle.appendChild(publicationDate)
    divArticle.appendChild(boutonModifier)
    divArticle.appendChild(boutonSupprimer)

    divConteneurActualites.appendChild(divArticle)
  }
}

async function supprimerArticle(id) {
  const token = localStorage.getItem("token")
  const response = await fetch(`http://localhost:3000/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  if (!response.ok) {
    const error = await response.json()
    alert("Erreur suppression : " + (error.message || "inconnue"))
  }
}

async function main() {
  console.log("appel de la fonction main")

  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem("token")
  if (!token) {
    // Si pas de token → redirection vers la page login
    window.location.href = "login.html"
    return
  }

  try {
    // Afficher le bouton Ajouter
    afficherBoutonAjouter()

    // Récupérer les articles depuis l’API
    let listeArticles = await getArticles()

    // Afficher les articles dans la page
    afficherArticles(listeArticles)
  } catch (error) {
    console.error("Erreur lors du chargement des articles :", error)
    alert("Erreur lors du chargement des articles")
  }
}




