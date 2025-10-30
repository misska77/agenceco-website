// gestion connexion utilisateur
async function loginUser(email, password) {//creation fonction avec prise en compte de 2 paramètres email et password
  try {
    const response = await fetch("http://localhost:3000/login", {//fait une requete Http vers l'API
      method: "POST",// la requete est de type post (envoyer des données)
      headers: { "Content-Type": "application/json" },//le corp de la requête est encodé en JSON
      body: JSON.stringify({ email, password }),// JSON.Stringify transforme l'objet javascript (email, password) en chaine JSON
    });

    if (!response.ok) throw new Error("Erreur de connexion"); // Si reponse ko message d'erreur

    const data = await response.json(); //lit le corp de la reponse et transforme en objet Javascript

    // Sauvegarde l'utilisateur dans le localStorage
    localStorage.setItem("user", JSON.stringify(data));

    window.location.href = "blog.html"; // et redirige vers la page blog.html
  } catch (error) {// si user non reconnu message echec connexion
    alert("Échec de la connexion : " + error.message);
  }
}

// gestion du formulaire de connexion 

function gererLoginForm(formSelector) {//création fonction gererLoginForm avec un param (formSelector) donné pour apporté de la flexibilité au code
  const form = document.querySelector(formSelector);

  if (!form) {//si aucun formulaire trouvé retourne un message d'erreur en console
    console.error("Aucun formulaire trouvé :", formSelector);
    return;
  }

  form.addEventListener("submit", (e) => {// ici on écoute le bouton "envoyer" du formulaire 
    e.preventDefault();//on empeche le raffraischissement de la page

    const email = form.querySelector("#email").value;// on recupère la valeur entrée du champ email
    const password = form.querySelector("#password").value;// de m^me pour le password

    loginUser(email, password);//appelle la fonction loginUser crée plus haut
  });
}

// appel de la fonction gererLoginForm
gererLoginForm("form");
