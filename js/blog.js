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
// récuperation des articles de l'API si Token Validé

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
  // recuperation du Token dans le localStorage
  const token = localStorage.getItem("token")
  // recuperation de l'id de l'article et suppression de l'article si token présent
  const response = await fetch(`http://localhost:3000/articles/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  })
  // Sinon renvoi message erreur
  if (!response.ok) {
    const error = await response.json()
    alert("Erreur suppression : " + (error.message || "inconnue"))
  }
}
 // affichage et creation des balises et boutons
function afficherArticles(listeArticles) {
  const divConteneurActualites = document.querySelector('.conteneurActualites')
  divConteneurActualites.innerHTML = ""

  for (let article of listeArticles) {
    const divArticle = document.createElement("div")
    divArticle.classList.add("ficheArticle")

    const title = document.createElement("h3")
    title.textContent = article.title

    const description = document.createElement("p")
    description.textContent = article.description

    const content = document.createElement("p")
    content.textContent = article.content

    const footer = document.createElement("div")
    footer.classList.add("pied-fiche")

    const publicationDate = document.createElement("p")
    publicationDate.classList.add("date")
    publicationDate.textContent = article.publicationDate

    // Bouton Modifier
    const boutonModifier = document.createElement("button")
    boutonModifier.textContent = "Modifier"
    boutonModifier.classList.add("btn-modifier")
    boutonModifier.addEventListener("click", () => {
      window.location.href = `formarticle.html?id=${article.id}`
    })

    // Bouton Supprimer
    const boutonSupprimer = document.createElement("button")
    boutonSupprimer.textContent = "Supprimer"
    boutonSupprimer.classList.add("btn-supprimer")
    boutonSupprimer.addEventListener("click", async () => {
      if (confirm("Voulez-vous vraiment supprimer cette actualité ?")) {
        await supprimerArticle(article.id)
        main()
      }
    })
    // relier enfants aux parents
    footer.appendChild(publicationDate)
    footer.appendChild(boutonModifier)
    footer.appendChild(boutonSupprimer)

    divArticle.appendChild(title)
    divArticle.appendChild(description)
    divArticle.appendChild(content)
    divArticle.appendChild(footer)

    divConteneurActualites.appendChild(divArticle)
  }
}
// afficher le bouton ajouter un article que si le token est present dans le localStorage
function afficherBoutonAjouter() {
  const token = localStorage.getItem("token")
  const container = document.querySelector('.conteneurActualites')
  container.innerHTML = ""
  const boutonAjouter = document.createElement("button")
  boutonAjouter.textContent = "Ajouter une actualité"
  boutonAjouter.classList.add("btn-ajouter")

  boutonAjouter.addEventListener("click", () => {
    window.location.href = "formarticle.html"
  })

  container.parentNode.insertBefore(boutonAjouter, container)
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

