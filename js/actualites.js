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

    // Si l'utilisateur est connecté, on ajoute les boutons
    if (user) {
      const btnEdit = document.createElement("button");
      btnEdit.textContent = "Modifier";
      btnEdit.classList.add("btn-edit");
      btnEdit.addEventListener("click", () => modifierArticle(article.id));

      const btnDelete = document.createElement("button");
      btnDelete.textContent = "Supprimer";
      btnDelete.classList.add("btn-delete");
      btnDelete.addEventListener("click", () => supprimerArticle(article.id));

      footer.appendChild(btnEdit);
      footer.appendChild(btnDelete);
    }

    articleCard.appendChild(title);
    articleCard.appendChild(description);
    articleCard.appendChild(content);
    articleCard.appendChild(footer);

    divConteneurActualites.appendChild(articleCard);
  }
}

function afficherBoutonAjout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const zoneBouton = document.getElementById("zone-bouton-ajout");

  // Vérifie que le conteneur existe bien
  if (!zoneBouton) {
    console.warn("⚠️ Élément #zone-bouton-ajout introuvable dans le HTML.");
    return;
  }

  // Nettoie la zone (utile si on recharge la liste)
  zoneBouton.innerHTML = "";

  // Si un utilisateur est connecté → afficher le bouton
  if (user) {
    const boutonAjout = document.createElement("button");
    boutonAjout.textContent = "Ajouter un article";
    boutonAjout.classList.add("btn-ajout");

    boutonAjout.addEventListener("click", () => {
      window.location.href = "formajout.html"; // redirection
    });

    zoneBouton.appendChild(boutonAjout);
  }
}

async function supprimerArticle(id) {
  // demander confirmationde la suppression
  const confirmation = confirm("Voulez-vous vraiment supprimer cet article ?");

  if (!confirmation) {
    console.log("Suppression annulée par l'utilisateur.");
    return; // on arrête ici
  }

  // executer si supression confirmée
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Erreur inconnue lors de la suppression");
    }

    alert("Article supprimé avec succès !");
    main(); // recharge la liste
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    alert("Une erreur est survenue : " + error.message);
  }
}

function modifierArticle(id) {
  window.location.href = `formmodif.html?id=${id}`;
}

async function main() {
  console.log("appel de la fonction main");
  try {

    afficherBoutonAjout();

    let listeArticles = await getArticles();
    afficherArticles(listeArticles);
  } catch (error) {
    console.log("erreur fichier json", error);
  }
}

main()
