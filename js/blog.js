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
  const divConteneurActualites = document.querySelector('.conteneurActualites');
  const user = JSON.parse(localStorage.getItem("user"));

  divConteneurActualites.innerHTML = '';

  for (let i = 0; i < listeArticles.length; i++) {
    const article = listeArticles[i];

    const articleCard = document.createElement('div');
    articleCard.classList.add("ficheArticle");

    const title = document.createElement("h3");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.textContent = article.description;

    const content = document.createElement("p");
    content.textContent = article.content;

    const footer = document.createElement("div");
    footer.classList.add("article-footer");

    const publicationDate = document.createElement("p");
    publicationDate.classList.add("date");
    publicationDate.textContent = "Publié le " + article.publicationDate;

    footer.appendChild(publicationDate);
    articleCard.appendChild(title);
    articleCard.appendChild(description);
    articleCard.appendChild(content);
    articleCard.appendChild(footer);

    divConteneurActualites.appendChild(articleCard);
  }
}

async function main() {
  console.log("appel de la fonction main");
  try {
    let listeArticles = await getArticles();
    afficherArticles(listeArticles);
  } catch (error) {
    console.log("erreur fichier json", error);
  }
}

main()



