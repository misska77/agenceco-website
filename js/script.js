//slide galerie

//recuperation des 2 boutons chevron
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const slides = document.getElementById('slides');

let slide = 0 // on cree une variable qui dit que le début de l'animation part de la slide 

prev.addEventListener('click', () => {   // On écoute le bouton "precedent" au clic 
  slide = slide - 1 // slide -1 pour revenir sur la slide précedente
  changeSlide(); //on appelle la fonction
})

next.addEventListener('click', () => {   // On écoute le bouton "suivant" au clic
  slide =slide + 1  // slide + 1  pour passer à la slide suivante
  changeSlide(); //on appelle la fonction 
})

// création de la fonction pour changer de slide 
function changeSlide() {
slides.style.transform = 'translateX(-' + (slide*100) + '%)'; //on décale l'image cachée suivante ou precedente pour qu'elle s'affiche en position 0  
}


function afficherArticles(listeArticles) {
  const divConteneurActualites = document.querySelector('.conteneurActualites')
  console.log("afficherArticles")

  divConteneurActualites.innerHTML = '';

  for (let i = 0; i < listeArticles.length; i++) {
    const article = listeArticles[i];

    const lien = document.createElement('a');
    lien.href = `detail.html?id=${article.id}`;
    lien.classList.add("ficheArticle");
    lien.style.display = "block"

    const divFicheArticle = document.createElement('div')
    divFicheArticle.classList.add("ficheArticle")

    const title = document.createElement("h3")
    title.textContent = article.title

    const description = document.createElement("p")
    description.textContent = article.description

    const content = document.createElement("p")
    content.textContent = article.content
    console.log(content.textContent)
    const publicationDate = document.createElement("p")
    publicationDate.classList.add("date")
    publicationDate.textContent = article.publicationDate

    divConteneurActualites.appendChild(lien)
    lien.appendChild(title)
    lien.appendChild(description)
    lien.appendChild(content)
    lien.appendChild(publicationDate)
  }
}

async function main() {
  console.log("appel de la fonction main");
  try {
    let listeArticles = await getArticles();
    console.log(listeArticles);

    // tri des articles par date décroissante
    listeArticles.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));

    // Ne garder que les 3 premiers
    listeArticles = listeArticles.slice(0, 3);

    // Afficher seulement ces 3 articles
    afficherArticles(listeArticles);
  } catch (error) {
    console.log("erreur fichier json", error);
  }
}

main();