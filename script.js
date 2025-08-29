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
  
  /*const div = document.querySelector('.articles')
  const titleArticle = document.createElement('h3')
  titleArticle.textContent = "Titre de l'actualité"
  const descriptionArticle = document.createElement('p')
  descriptionArticle.textContent = "Description de l'actualité"
  const contentArticle = document.createElement('p')
  contentArticle.textContent = "Contenu de l'actualité"
  const publicationDateArticle = document.createElement('p')
  publicationDateArticle.textContent = "Date de publication"

  const divArticles = document.querySelector(".articles")
  divArticles.appendChild(titleArticle)
  divArticles.appendChild(descriptionArticle)
  divArticles.appendChild(contentArticle)
  divArticles.appendChild(publicationDateArticle)*/
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
