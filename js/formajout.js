//
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formAjoutArticle").addEventListener("submit", async (event) => {
    event.preventDefault();//on empeche le rechargement de la page

    const titre = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const contenu = document.getElementById("content").value.trim();

    if (!titre || !description || !contenu) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await ajouterArticle(titre, description, contenu);
      alert("Article ajouté");
      window.location.href = "blog.html";
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  });
});

