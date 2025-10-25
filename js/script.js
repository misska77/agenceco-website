// gestion de la slide
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("galerieSlides");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

// --- ARTICLES : affichage page d'accueil ---
async function afficherDerniersArticles() {
  try {
    let listeArticles = await getArticles();
    listeArticles.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
    listeArticles = listeArticles.slice(0, 3);

    const divConteneur = document.querySelector('.conteneurActualites');
    divConteneur.innerHTML = '';

    for (const article of listeArticles) {
      const lien = document.createElement('a');
      lien.href = `detail.html?id=${article.id}`;
      lien.classList.add("ficheArticle");

      const titre = document.createElement("h3");
      titre.textContent = article.title;

      const description = document.createElement("p");
      description.textContent = article.description;

      const publicationDate = document.createElement("p");
      publicationDate.classList.add("date");
      publicationDate.textContent = article.publicationDate;

      lien.append(titre, description, publicationDate);
      divConteneur.appendChild(lien);
    }
  } catch (error) {
    console.error("Erreur de chargement des articles :", error);
  }
}

afficherDerniersArticles();
