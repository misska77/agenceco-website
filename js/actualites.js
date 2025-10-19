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

    // ✅ Si l'utilisateur est connecté, on ajoute les boutons
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


async function supprimerArticle(id) {
  // Étape 1 : demander confirmation
  const confirmation = confirm("Voulez-vous vraiment supprimer cet article ?");

  if (!confirmation) {
    console.log("Suppression annulée par l'utilisateur.");
    return; // on arrête ici
  }

  // Étape 2 : exécution si confirmé
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
    let listeArticles = await getArticles();
    afficherArticles(listeArticles);
  } catch (error) {
    console.log("erreur fichier json", error);
  }
}

main()
/*async function getArticles() {
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

//Si l'utilisateur est connecté, on ajoute les boutons
    if (user) {
      const btnEdit = document.createElement("button");
      btnEdit.type = "button";
      btnEdit.textContent = "Modifier";
      btnEdit.classList.add("btn-edit");
      btnEdit.addEventListener("click", () => {
        window.location.href = `formmodif.html?id=${article.id}`;
      });

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

// gestion du bouton supprimer un article
async function supprimerArticle(id) {
  //demander confirmation
  const confirmation = confirm("Voulez-vous vraiment supprimer cet article ?");

  if (!confirmation) {
    console.log("Suppression annulée par l'utilisateur.");
    return; // on arrête ici
  }

  //exécution si confirmé
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

async function main() {
  console.log("appel de la fonction main");
  try {
    let listeArticles = await getArticles();
    afficherArticles(listeArticles);
  } catch (error) {
    console.log("erreur fichier json", error);
  }
}

main()*/