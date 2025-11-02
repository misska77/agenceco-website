//gestion des articles communs à toutes les pages

// Récupération des articles depuis l'API REST
async function getArticles() { //creation de la fonction de recupération des articles
  try {
    const response = await fetch("http://localhost:3000/articles"); //déclare l'url de l'API 
    if (!response.ok) throw new Error("Erreur lors du chargement des articles");// si l'API ne repond pas on retourne un message d'erreur
    return await response.json(); //si elle repond on attend la reponse des données en JSON uniquement
  } catch (error) {
    console.error("getArticles:", error);
    throw error;
  }
}

// Afficher les articles
function afficherArticles(listeArticles, options = {}) {//creation de la fonction affichage des articles
  const divConteneur = document.querySelector('.conteneurActualites'); //récuperation conteneur actualités
  const user = JSON.parse(localStorage.getItem("user")); //recuperation du user dans le local storage

  divConteneur.innerHTML = ""

  listeArticles.forEach(article => {//pour chaque article de la liste des articles
    const lien = document.createElement('a');//cree un lien qui servira pour la page détail
    lien.href = `detail.html?id=${article.id}`;//le lien sera un id
    lien.classList.add("ficheArticle");//le lien aura une classe ficheArticle
    lien.style.display = "block"; // le lien sera un bloc 

    const title = document.createElement("h3");//cree un titre 
    title.textContent = article.title;

    const description = document.createElement("p");//cree un paragraphe description
    description.textContent = article.description;

    const content = document.createElement("p");//cree un paragraphe contenu 
    content.textContent = article.content;

    const footer = document.createElement("div");//cree une div pour la date et les boutons
    footer.classList.add("article-footer");

    const date = document.createElement("p");//cree un paragraphe date
    date.classList.add("date");
    date.textContent = "Publié le " + article.publicationDate; //avec un text figé avant la date
    footer.appendChild(date);//on rattache la date au footer du bloc

    // Si utilisateur est connecté on cree les boutons ajouter modifier et supprimer sur la page blog.html
    if (user && options.afficherBoutons) {
      const btnEdit = document.createElement("button");
      btnEdit.textContent = "Modifier";
      btnEdit.classList.add("btn-edit");
      btnEdit.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        modifierArticle(article.id);
      });

      const btnDelete = document.createElement("button");
      btnDelete.textContent = "Supprimer";
      btnDelete.classList.add("btn-delete");
      btnDelete.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        supprimerArticle(article.id);
      });

      footer.appendChild(btnEdit);//on rattache les enfants (les boutons) au parent (le footer du bloc)
      footer.appendChild(btnDelete);
    }

    lien.append(title, description, content, footer);//on rattache les liens crees plus haut au parent le conteneur
    divConteneur.appendChild(lien);
  });
}

// Afficher le bouton "Ajouter un article" si utilisateur connecté
function afficherBoutonAjout() {
  const user = JSON.parse(localStorage.getItem("user"));// si user connecté on affiche le bouton ajout
  const zoneBouton = document.getElementById("zone-bouton-ajout");//on récupère la zone d'emplacement html
  if (!zoneBouton) return; // si zone n'existe pas stoppe cette fonction

  zoneBouton.innerHTML = "";// et supprime ce qu'il y a à l'interieur de cette zone

  if (user) {// si l'utilisateur est connecté alors on execute ce qui suit 
    const btn = document.createElement("button");//creation du bouton ajouter
    btn.textContent = "Ajouter un article";// qui contient le texte ..
    btn.classList.add("btn-ajout");// on rajoute une class
    btn.addEventListener("click", () => {//on écoute le bouton au click et
      window.location.href = "formajout.html";//on redirige vers la page de création d'un nouvel article
    });
    zoneBouton.appendChild(btn);//on rattache le bouton à la div zoneBouton
  }
}

// Supprimer un article
async function supprimerArticle(id) {//on cree la fonction supprimer un article
  const confirmation = confirm("Voulez-vous vraiment supprimer cet article ?"); 
  if (!confirmation) return;//si la suppression 'est pas confirmée on arrette la fonction

  const token = localStorage.getItem("token"); //récuperation du token dans le localstorage
  try {
    const response = await fetch(`http://localhost:3000/articles/${id}`, { // on fait la requete pour recuperer l'article par son id depuis l'API REST
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` } //si token ok on déclanche la suppression
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression");// sinon message d'erreur

    alert("Article supprimé !");//si reponse ok message de succès
    location.reload();//et rechargement des champs
  } catch (error) {
    alert("Erreur : " + error.message);
  }
}

// fonction pour modifier un article
function modifierArticle(id) { //on récupère l'article par son id sur lequel on clique
  window.location.href = `formmodif.html?id=${id}`;
}

// Fonction principale (appelée selon la page index ou blog)
async function main(page = "index") {//creation d'une fonction qui va afficher les articles selon la page index
  try {
    let articles = await getArticles();

    // Trier par date décroissante
    articles.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));

    if (page === "index") {
      // Afficher uniquement les 3 derniers
      afficherArticles(articles.slice(0, 3), { afficherBoutons: false });
    } else if (page === "blog") {
      afficherBoutonAjout();
      afficherArticles(articles, { afficherBoutons: true });
    } else {
      // sinon afficher tous les articles
      afficherArticles(articles, { afficherBoutons: false });
    }

  } catch (error) {
    console.error("main:", error);
  }
}

// gestion du formulaire ajout et modif

// Récupérer un paramètre d'URL 
function getUrlParam(paramName) {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
}

// Récupérer un article précis par son id
async function getArticle(id) {
  const token = localStorage.getItem("token"); //récuperation du token

  const response = await fetch(`http://localhost:3000/articles/${id}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  const article = await response.json();
  if (!response.ok) throw new Error(article.message || "Impossible de charger l'article");

  return article;
}

// Ajouter un article
async function ajouterArticle(titre, description, contenu) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      title: titre,
      description: description,
      content: contenu,
      publicationDate: new Date().toISOString().split("T")[0]
    })
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Erreur lors de l'ajout de l'article");

  return result;
}

// Modifier un article existant
async function modifierArticleServeur(id, titre, description, contenu) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/articles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      title: titre,
      description: description,
      content: contenu
    })
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Erreur lors de la mise à jour");

  return result;
}


