async function getArticles() {
  let response = await fetch("http://localhost:3000/articles");
  let listeArticles = await response.json();
  return listeArticles;
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
    publicationDate.textContent = article.publicationDate
    
    divConteneurActualites.appendChild(divFicheArticle)
    divFicheArticle.appendChild(title)
    divFicheArticle.appendChild(description)
    divFicheArticle.appendChild(content)
    divFicheArticle.appendChild(publicationDate)
    
  }
}

async function main() {
  try {
    let listeArticles = await getArticles();
    console.log(listeArticles)
    afficherArticles(listeArticles);
  } catch (error) {
    console.log("erreur fichier json", error)
  }
}

main();