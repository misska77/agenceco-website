// login.js
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Erreur de connexion");
    
    const data = await response.json();
    

    // l'API renvoi un token
    localStorage.setItem("user", JSON.stringify(data)); // on garde en mémoire l’utilisateur
    window.location.href = "actualites.html"; // redirection
  } catch (error) {
    alert("Échec de la connexion : " + error.message);
  }

});

