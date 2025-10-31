//quand le html de la page a fini de se charger, exécute la fonction
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formAjoutArticle").addEventListener("submit", async (event) => {
    event.preventDefault();//on empêche le rechargement de la page

    const titre = document.getElementById("title").value.trim();//on récupère les valeurs saisies des champs titre, description et contenu
    const description = document.getElementById("description").value.trim();
    const contenu = document.getElementById("content").value.trim();

    if (!titre || !description || !contenu) {//si pas de valeur dans un ou + des champs retour message d'arlerte
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {//mécanisme gestion d'erreur
      await ajouterArticle(titre, description, contenu);//on appelle la fonction ajouter articles du fichier articles.js
      alert("Article ajouté");//Si tout s'est bien passé message succes
      window.location.href = "blog.html";
    } catch (error) {//si erreur survient on affiche le message d'erreur
      alert("Erreur : " + error.message);
    }
  });
});

