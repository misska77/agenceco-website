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

function displayArticles(articles) {
  const ficheArticles = articles[0]
  const titleElement = document.createElement("h3")
  titleElement.innerText = articles.title
  const descriptionElement = document.createElement("p")
  descriptionElement.innerText = articles.description
  const contentElement = document.createElement("p")
  contentElement.innerText = articles.content
  const publicationDateElement = document.createElement("p")
  publicationDateElement.innerText = articles.publicationdate

  const divActualites = document.querySelector(".actualites")
  divActualites.appendChild(articles.title)
  divActualites.appendChild(articles.description)
  divActualites.appendChild(articles.content)
  divActualites.appendChild(articles.publicationdate)
}


async function main() {
  try {
    let articles = await getArticles();
    console.log(articles)
    displayArticles(articles);
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
