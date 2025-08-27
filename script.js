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
  console.log(articles);
  /*faire affichage des articles dans le html(tarte aux pommes)*/
}

async function main() {
  let articles = await getArticles();
  displayArticles(articles);
}

main();

/*<div class="bloc-actualite">
          <h3>Le titre de mon actualité</h3>
          <p class="date">05/04/2023</p>
          <p>La description de l'actualité</p>
          <p>Le contenu de l'actualité</p>
        </div>*/
