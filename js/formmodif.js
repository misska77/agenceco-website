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

async function getArticles() {
  // recuperation du Token dans le localStorage
  const token = localStorage.getItem("token")
  const response = await fetch(`http://localhost:3000/articles/${id}`, {
    method: "UPDATE",
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (response.ok) {
    return (article)
  }

  document.getElementById("update-btn").addEventListener("click", function () {
    const titre = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const contenu = document.getElementById("content").value;

    article.push({
      titre: titre,
      description: description,
      contenu: contenu,
      date: new Date().toLocaleString()
    });

    let article = JSON.parse(localStorage.getItem("articles")) || [];

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("content").value = "";
  })
}