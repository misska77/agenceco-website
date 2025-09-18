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
  let response = await fetch("http://localhost:3000/articles");
  let listeArticles = await response.json();
  if (response.ok === true) {
    return listeArticles
  }
}

function afficherArticles(listeArticles) {
  const divConteneurActualites = document.querySelector('.conteneurActualites')
  console.log("afficherArticles")

  for (let i = 0; i < listeArticles.length; i++) {
    const article = listeArticles[i]

    /*creation du lien pour rendre les actualités cliquable et renvoyer vers une page de détail*/
    const lien = document.createElement('a')
    lien.href = 'detail.html?id=${articles.id}'
    lien.classList.add('ficheArticle')
    lien.style.display = 'block'

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
    boutonModifier.style.backgroundColor = "orange"
    boutonModifier.style.marginRight = "10px"
    boutonModifier.addEventListener("click", () => {
      window.location.href = `editArticle.html?id=${article.id}`
    })

    // --- Bouton Supprimer ---
    const boutonSupprimer = document.createElement("button")
    boutonSupprimer.textContent = "Supprimer"
    boutonSupprimer.style.backgroundColor = "red"
    boutonSupprimer.style.color = "white"
    boutonSupprimer.addEventListener("click", async () => {
      if (confirm("Voulez-vous vraiment supprimer cette actualité ?")) {
        await supprimerArticle(article.id)
        main() // recharger la liste après suppression
      }
    })

    lien.appendChild(title)
    lien.appendChild(description)
    lien.appendChild(content)
    lien.appendChild(publicationDate)
    lien.appendChild(boutonModifier)
    lien.appendChild(boutonSupprimer)

    divConteneurActualites.appendChild(lien)

  }
}

async function main() {
  console.log("appel de la fonction main")
  try {
    let listeArticles = await getArticles();
    console.log(listeArticles)
    afficherArticles(listeArticles);
  } catch (error) {
    console.log("erreur fichier json", error)
  }
}

main()

