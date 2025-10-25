
document.addEventListener("DOMContentLoaded", async () => {
  const id = getUrlParam("id");
  if (!id) {
    alert("Pas d'identifiant d'article");
    window.location.href = "blog.html";
    return;
  }

  try {
    const article = await getArticle(id);

    document.getElementById("title").value = article.title;
    document.getElementById("description").value = article.description;
    document.getElementById("content").value = article.content;
    document.getElementById("id").value = article.id;
  } catch (error) {
    alert("Erreur : " + error.message);
  }

  // Soumission du formulaire
  document.getElementById("formModifArticle").addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const titre = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const contenu = document.getElementById("content").value.trim();

    if (!titre || !description || !contenu) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await modifierArticleServeur(id, titre, description, contenu);
      alert("Article modifié");
      window.location.href = "blog.html";
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  });
});