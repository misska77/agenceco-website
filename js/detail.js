function escapeHTML(text) {//fonction qui permet de considérer certains caractères spéciaux html comme du txte et non des balises
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Récupère l'ID de l'article depuis l'URL
const params = new URLSearchParams(window.location.search);//cree un objet pour manipuler les paramètres
const id = params.get("id");//récupère la valeur du paramètre id de l'article

if (id) {// si id présent on charge l'article depuis l'API
  fetch(`http://localhost:3000/articles/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Article introuvable");//si la reponse false (ex code 404)retour message article introuvable
      return res.json();
    })

    .then(article => {//reponse true (ex code 200-299) on charge les données de l'article (id, titre, contenu...)
      const container = document.getElementById("detail-conteneur");//on récupère l'élément conteneur dans le DOM
      console.log(article)
      //on rempli le conteneur html avec un template string (de type texte) 
      // avec appel de la fonction escapeHTML pour la gestion des caractères spéciaux
      container.innerHTML = `
            <h3>${escapeHTML(article.title)}</h3>
            <p><strong>Date :</strong> ${escapeHTML(article.publicationDate)}</p>
            <p>${escapeHTML(article.content)}<p>
          `
    })
//mécanisme de gestion d'erreur - si une erreur survient retour message d'erreur
    .catch(err => {
      console.error(err);
      document.getElementById("detail-conteneur").textContent = "Erreur : impossible de charger l'article.";
    });

} else {
  document.getElementById("detail-conteneur").textContent = "Aucun article sélectionné.";
}

