// recuperer l'Id de l'article
function getUrlParam(paramName) {
  const params = new URLSearchParams(window.location.search)
  const param = params.get(paramName)
  return param
}

//recuperer l'article//
async function getArticle(id) {
  const token = localStorage.getItem("token")
  let response = await fetch(`http://localhost:3000/articles/${id}`, {
    headers: { "Authorization": `Bearer ${token}` }
  })

  //si token ok - l'API retourne la liste des articles
  let article = await response.json()
  if (response.ok) {
    return article
  }

  throw new Error(article.message || "Impossible de contacter le serveur")
}

//
async function initForm() {
  const id = getUrlParam("id")
  const article = await getArticle(id)
  console.log(article)

  document.getElementById("title").value = article.title
  document.getElementById("description").value = article.description
  document.getElementById("content").value = article.content
  document.getElementById("id").value = article.id
}

initForm()

document.getElementById("formModifArticle").addEventListener("submit", async function (event) {
  event.preventDefault();
  const id = document.getElementById("id").value;
  const titre = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const contenu = document.getElementById("content").value;

  if (!titre || !description || !contenu) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const token = localStorage.getItem("token");

  try {
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

    if (response.ok) {
      window.location.href = "blog.html"
    } else {
      alert(`erreur : ${result.message || "une erreur s'est produite."}`);
    }
  } catch (error) {
    alert("Erreur lors de la mise a jour : " + error.message);
  }
})
