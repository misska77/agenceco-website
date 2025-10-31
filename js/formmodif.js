//quand le html de la page a fini de se charger, execute la fonction
document.addEventListener("DOMContentLoaded", async () => {
  const id = getUrlParam("id");// appelle la fonction qui récupère un paramètre URL ici l'ID de l'article
  if (!id) {//condition qui verifie si il n'y a pas d'id
    alert("Pas d'identifiant d'article");// et renvoi une alerte si c'est le cas
    window.location.href = "blog.html";// redirige vers la page blog.html
    return;//stoppe le reste du code
  }

  try {
    const article = await getArticle(id);//récupère l'article par son id e plus bas récupère les valeurs modifiées sur l'article

    document.getElementById("title").value = article.title;//les champs sont préremplis avec les données actuelles
    document.getElementById("description").value = article.description;
    document.getElementById("content").value = article.content;
    document.getElementById("id").value = article.id;
  } catch (error) {//mécanisme de gestion d'erreur
    alert("Erreur : " + error.message);
  }

  // Soumission du formulaire
  //récuperation et écoute du formulaire par une action submit(bouton modifier pour soumission)
  document.getElementById("formModifArticle").addEventListener("submit", async (event) => {
    event.preventDefault();//empêche le comportement par défaut (raffraichissement de la page après soumission)
  //on récupère les valeurs de tous le champs du formulaire
    const id = document.getElementById("id").value;
    const titre = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const contenu = document.getElementById("content").value.trim();

    if (!titre || !description || !contenu) {// Si un des champs est vide message d'alerte et return stoppe fonction
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await modifierArticleServeur(id, titre, description, contenu);//appel de la fonction modifierArticleServeur présente sur articles.js
      alert("Article modifié");// si tout s'est bien passé message de succes
      window.location.href = "blog.html";
    } catch (error) {//si erreur survient on affiche un message d'erreur
      alert("Erreur : " + error.message);
    }
  });
});