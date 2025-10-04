// Récupère l'ID depuis l'URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  fetch(`http://localhost:3000/articles/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Article introuvable");
      return res.json();
    })
    .then(article => {
      const container = document.getElementById("detail-container");
      container.innerHTML = `
            <h3>${article.title}</h3>
            <p><strong>Date :</strong> ${article.publicationDate}</p>
            <img src="" alt="" class="">
            <p>${article.content}<p>
          `;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("detail-container").textContent = "Erreur : impossible de charger l'article.";
    });
} else {
  document.getElementById("detail-container").textContent = "Aucun article sélectionné.";
}

