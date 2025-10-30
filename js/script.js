//slide galerie

//recuperation des 2 boutons chevron
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const slides = document.getElementById('slides');

let slide = 0 // on cree une variable qui dit que le début de l'animation part de la slide 0 (première image)

prev.addEventListener('click', () => {   // On écoute le bouton "précedent" au clic 
  slide = slide - 1 // slide -1 pour revenir sur la slide précedente
  changeSlide(); //on appelle la fonction changer la slide en décalant l'image de -100
})

next.addEventListener('click', () => {   // On écoute le bouton "suivant" au clic
  slide =slide + 1  // slide + 1  pour passer à la slide suivante
  changeSlide(); //on appelle la fonction changer la slide en décalant l'image de +100
})

// création de la fonction pour changer de slide 
function changeSlide() {
slides.style.transform = 'translateX(-' + (slide*100) + '%)'; //on décale l'image cachée suivante ou precedente pour qu'elle s'affiche en position 0  
}

async function main() {//fonction main
  try {
    let listeArticles = await getArticles();//on recupère les articles 
    console.log(listeArticles);// affiche la liste des articles en console

    // tri des articles par date décroissante
    //.sort trie le tableau selon la fonction de comparaison d'un article à un autre  
    // new Date(a.publicationDate) & new Date(b.publicationDate)transforment les chaines de dates en objet
    //objet 1 - objet 2 on obtient une valeur positive ou negative reprise par .sort pour les mettre dans l'ordre souhaité.
    listeArticles.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));

    // on ne garde que les articles les plus recent (donc les 3 premiers)
    listeArticles = listeArticles.slice(0, 3);

    // Afficher seulement ces 3 articles
    afficherArticles(listeArticles);
  } catch (error) {
    console.log("erreur fichier json", error);
  }
}

main();//on appelle la fonction main