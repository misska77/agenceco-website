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

const form = document.querySelector("form")
form.addEventListener("submit", async function postLogin(event) {
    event.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (response.ok) {
            console.log(data.token)
            localStorage.setItem("token", data.token)
            window.location.href = "blog.html"
        } else {
            alert("Erreur : " + (data.message || "identifiants invalides"))
        }

    } catch (error) {
        console.error("Erreur lors de la requête :", error)
        alert("Impossible de se connecter au serveur")
    }
})
