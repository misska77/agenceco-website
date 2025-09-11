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

// slide-Galerie
let slideIndex = 1;
showSlides(slideIndex);

// controle bouton chevron
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("galerieSlides");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }

  slides[slideIndex - 1].style.display = 'block'
}

// Actualité
async function getArticles() {
  console.log("getArticles")
  let response = await fetch("http://localhost:3000/articles");
  let listeArticles = await response.json();
  if (response.ok === true) {
    return listeArticles;
  }
  throw new Error('Impossible de contacter le serveur')
}

function afficherArticles(listeArticles) {
  const divConteneurActualites = document.querySelector('.conteneurActualites')
  console.log("afficherArticles")
  /* ici trier le tableau listeArticles*/

  for (let i = 0; i < listeArticles.length && i < 3; i++) {
    const article = listeArticles[i]
    const divFicheArticle = document.createElement('div')
    divFicheArticle.classList.add("ficheArticle")

    const title = document.createElement("h3")
    title.textContent = article.title

    const description = document.createElement("p")
    description.textContent = article.description

    const content = document.createElement("p")
    content.textContent = article.content

    const publicationDate = document.createElement("p")
    publicationDate.classList.add("date")
    publicationDate.textContent = article.publicationDate

    divConteneurActualites.appendChild(divFicheArticle)
    divFicheArticle.appendChild(title)
    divFicheArticle.appendChild(description)
    divFicheArticle.appendChild(content)
    divFicheArticle.appendChild(publicationDate)

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