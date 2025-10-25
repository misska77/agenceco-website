function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
      const container = document.getElementById("detail-conteneur");
      console.log(article)
      container.innerHTML = `
            <h3>${escapeHTML(article.title)}</h3>
            <p><strong>Date :</strong> ${escapeHTML(article.publicationDate)}</p>
            <p>${escapeHTML(article.content)}<p>
          `
    })

    .catch(err => {
      console.error(err);
      document.getElementById("detail-conteneur").textContent = "Erreur : impossible de charger l'article.";
    });

} else {
  document.getElementById("detail-conteneur").textContent = "Aucun article sélectionné.";
}

