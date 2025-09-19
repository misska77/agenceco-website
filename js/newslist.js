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

// 1. Récupérer les articles
async function getArticles() {
  const token = localStorage.getItem("token")
  let response = await fetch("http://localhost:3000/articles", {
    headers: { "Authorization": `Bearer ${token}` }
  })
  let listeArticles = await response.json()
  if (response.ok) {
    return listeArticles
  }
  throw new Error(listeArticles.message || "Impossible de contacter le serveur")
}

// 2. Supprimer un article
async function supprimerArticle(id) {
  const token = localStorage.getItem("token")
  const response = await fetch(`http://localhost:3000/articles/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  })
  if (!response.ok) {
    const error = await response.json()
    alert("Erreur suppression : " + (error.message || "inconnue"))
  }
}

// 3. Afficher la liste des articles
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

    //  Conteneur pour la date + les boutons
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
      window.location.href = `editArticle.html?id=${article.id}`
    })

    // Bouton Supprimer
    const boutonSupprimer = document.createElement("button")
    boutonSupprimer.textContent = "Supprimer"
    boutonSupprimer.classList.add("btn-supprimer")
    boutonSupprimer.addEventListener("click", async () => {
      if (confirm("Voulez-vous vraiment supprimer cette actualité ?")) {
        await supprimerArticle(article.id)
        main() // recharge la liste
      }
    })

    // On met la date + boutons dans le footer
    footer.appendChild(publicationDate)
    footer.appendChild(boutonModifier)
    footer.appendChild(boutonSupprimer)

    // On construit l’article
    divArticle.appendChild(title)
    divArticle.appendChild(description)
    divArticle.appendChild(content)
    divArticle.appendChild(footer)

    divConteneurActualites.appendChild(divArticle)
  }
}

// 4. 👉 Ici ta fonction afficherBoutonAjouter
function afficherBoutonAjouter() {
  const container = document.querySelector('.conteneurActualites')

  const boutonAjouter = document.createElement("button")
  boutonAjouter.textContent = "Ajouter une actualité"
  boutonAjouter.classList.add("btn-ajouter")

  boutonAjouter.addEventListener("click", () => {
    window.location.href = "formarticle.html"
  })

  container.parentNode.insertBefore(boutonAjouter, container)
}

// 5. La fonction principale
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

// Lancer au chargement
main()

