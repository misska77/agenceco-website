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
    const lien = document.createElement('a');
    lien.href = `detail.html?id=${article.id}`;
    lien.classList.add("ficheArticle");
    lien.style.display = "block"; // permet quer toute la carte soit cliquable

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

    // Si on est sur la page blog.html & utilisateur connecté → afficher boutons
    if (options.afficherBoutons && user) {
      const btnEdit = document.createElement("button");
      btnEdit.textContent = "Modifier";
      btnEdit.classList.add("btn-edit");
      btnEdit.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();// empêche la propagation du clic vers le <a>
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

      footer.appendChild(btnEdit);
      footer.appendChild(btnDelete);
    }

    lien.append(title, description, content, footer);
    divConteneur.appendChild(lien);
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

// Fonction principale (appelée selon la page index ou blog)
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


