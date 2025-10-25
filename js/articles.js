//gestion des articles communs à toutes les pages

// Récupération des articles depuis l'API
async function getArticles() {
  try {
    const response = await fetch("http://localhost:3000/articles");
    if (!response.ok) throw new Error("Erreur lors du chargement des articles");
    return await response.json();
  } catch (error) {
    console.error("getArticles:", error);
    throw error;
  }
}

// Afficher les articles
function afficherArticles(listeArticles, options = {}) {
  const divConteneur = document.querySelector('.conteneurActualites');
  const user = JSON.parse(localStorage.getItem("user"));
  divConteneur.innerHTML = '';

  listeArticles.forEach(article => {
    const card = document.createElement('div');
    card.classList.add("ficheArticle");

    const title = document.createElement("h3");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.textContent = article.description;

    const content = document.createElement("p");
    content.textContent = article.content;

    const footer = document.createElement("div");
    footer.classList.add("article-footer");

    const date = document.createElement("p");
    date.classList.add("date");
    date.textContent = "Publié le " + article.publicationDate;
    footer.appendChild(date);

    // Si on est sur blog.html & utilisateur connecté → afficher boutons
    if (options.afficherBoutons && user) {
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

    card.append(title, description, content, footer);
    divConteneur.appendChild(card);
  });
}

// Afficher le bouton "Ajouter un article" si utilisateur connecté
function afficherBoutonAjout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const zoneBouton = document.getElementById("zone-bouton-ajout");
  if (!zoneBouton) return;

  zoneBouton.innerHTML = "";

  if (user) {
    const btn = document.createElement("button");
    btn.textContent = "Ajouter un article";
    btn.classList.add("btn-ajout");
    btn.addEventListener("click", () => {
      window.location.href = "formajout.html";
    });
    zoneBouton.appendChild(btn);
  }
}

// Supprimer un article
async function supprimerArticle(id) {
  const confirmation = confirm("Voulez-vous vraiment supprimer cet article ?");
  if (!confirmation) return;

  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression");

    alert("Article supprimé !");
    location.reload();
  } catch (error) {
    alert("Erreur : " + error.message);
  }
}

// Rediriger vers le formulaire de modification
function modifierArticle(id) {
  window.location.href = `formmodif.html?id=${id}`;
}

// Fonction principale (appelée selon la page)
async function main(page = "index") {
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
      // autre page (ex: actualites.html)
      afficherArticles(articles, { afficherBoutons: false });
    }

  } catch (error) {
    console.error("main:", error);
  }
}

