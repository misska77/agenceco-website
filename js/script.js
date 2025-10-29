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