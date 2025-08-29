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
};

async function getArticles() {
  let response = await fetch("http://localhost:3000/articles");
  let articles = await response.json();
  return articles;
}

function afficherArticles(articles) {
  const divArticles = document.querySelector(".articles")

  for (let article of articles) {
    const title = document.createElement("h3")
    title.textContent = "Titre de l'actualité"

    const description = document.createElement("p")
    description.textContent = "Description de l'article"

    const content = document.createElement("p")
    content.textContent = "Contenu de l'article"

    const publicationDate = document.createElement("p")
    publicationDate.textContent = "Date de publication"

    divArticles.appendChild(Title)
    divArticles.appendChild(description)
    divArticles.appendChild(content)
    divArticles.appendChild(publicationDate)
  }
}

async function main() {
  try {
    let articles = await getArticles();
    console.log(articles)
    afficherArticles(articles);
  } catch {
    console.log("erreur fichier json")
  }
}

main();

/*<div class="articles">
          <h3>Le titre de mon actualité</h3>
          <p class="date">05/04/2023</p>
          <p>La description de l'actualité</p>
          <p>Le contenu de l'actualité</p>
        </div>*/
