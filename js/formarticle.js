// Menu burger
const menu = document.querySelector(".nav-links");
const btnToggle = document.querySelector(".toggle");
const iconToggle = document.querySelector(".fa-bars");

btnToggle.onclick = function () {
  if (iconToggle.classList.contains("fa-bars")) {
    iconToggle.classList.replace("fa-bars", "fa-times");
    menu.classList.toggle("hidden");
  } else {
    iconToggle.classList.replace("fa-times", "fa-bars");
    menu.classList.toggle("hidden");
  }
}

/*export function ajoutListenerAjoutActualite() {
  const formulaireArticle = document.querySelector('formaticle.html/.ficheArticle')
  formulaireArticle.addEventListener("submit", function(event) {
    event.preventDefault()
    //creation objet//
    const article = {
    articleId: parseInt(event.target.querySelector("[name=id]").value),
    title: event.target.querySelector("[name=title]").value,
    description: event.target.querySelector("[name=description]").value,
    content: event.target.querySelector("[name=content]").value,
    publicationDate: event.target.querySelector("[name=publicationDate]").value
    }

    // creation charge utile au format JSON//
    const chargeUtile = JSON.stringify(article)
    fetch("http://localhost:3000/articles", {
      method: "POST",
      headers: {"Content-Type": "application"},
      body: chargeUtile
    })
  })
}*/
