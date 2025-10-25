// gestion connexion utilisateur
async function loginUser(email, password) {//prise en compte de 2 paramètre emailet password
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",// requete de type post (envoyer des données)
      headers: { "Content-Type": "application/json" },//signifie que le corp de la requête est encodé en JSON
      body: JSON.stringify({ email, password }),// JSON.Stringify transforme l'objet javascript (email, password) en chaine JSON
    });

    if (!response.ok) throw new Error("Erreur de connexion"); // Si reponse ko message d'erreur

    const data = await response.json(); //transforme l'objet en Javascript

    // Sauvegarde l'utilisateur dans le localStorage
    localStorage.setItem("user", JSON.stringify(data));

    window.location.href = "blog.html"; // redirection
  } catch (error) {
    alert("Échec de la connexion : " + error.message);
  }
}

// gestion du formulaire de connexion 

function gererLoginForm(formSelector) {
  const form = document.querySelector(formSelector);

  if (!form) {
    console.error("Aucun formulaire trouvé :", formSelector);
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;

    loginUser(email, password);
  });
}

// appel de la fonction gererLoginForm
gererLoginForm("form");
