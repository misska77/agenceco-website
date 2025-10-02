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
