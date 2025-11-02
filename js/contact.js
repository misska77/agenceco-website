//déclarer tous les champs
const form = document.querySelector('form')
const baliseNom = document.querySelector('#nom');
const baliseCategorie = document.querySelector('#categorie');
const baliseVille = document.querySelector('#ville');
const baliseTelephone = document.querySelector('#telephone')
const baliseEmail = document.querySelector('#email')
const baliseMessage = document.querySelector('#message')
const errorMsg = document.getElementById('errorMsg')
//Déclarer les champs tel et email avec un format défini
const telRegex = /^[0-9]{10}$/;
const emailRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,}$/i

//fonction de verification des champs obligatoires
function verifierRempli(balise) {//balise input ou textaera a prendre en compte
  if (balise.value.trim() === "") {// Si la valeur saisie dans les champs - (.trim supprimes les espaces en début ou fin de texte)
    balise.classList.add("error");// est absente ajoute la classe error à l'élément
    return false;//et retourne faux 
  } else {
    balise.classList.remove("error");//si le champs est rempli retire la classe error et retourne vraie
    return true;
  }
}

//fonction verifierTel
function verifierTel() {
  if (!telRegex.test(baliseTelephone.value.trim())) {//si la valeur saisie dans le champs tel n'obeit pas au format 
    baliseTelephone.classList.add("error");//ajoute la classe error à l'élément et retourne faux
    return false;
  } else {
    baliseTelephone.classList.remove("error");//si la valeur saisie est juste retire la class error et retourne vrai
    return true;
  }
}

//fonction verifierEmail
function verifierEmail() {
  if (!emailRegex.test(baliseEmail.value.trim())) {//si la valeur saisie dans le champs tel n'obeit pas au format 
    baliseEmail.classList.add("error");//ajoute la classe error à l'élément et retourne faux
    return false;
  } else {
    baliseEmail.classList.remove("error");//si la valeur saisie est juste retire la class error et retourne vrai
    return true;
  }
}

// écoute du formulaire à la soumission via bouton "envoyer"
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let toutValide = true//déclare une variable si toutValide = vrai

  if (!verifierRempli(baliseNom)) toutValide = false;//si baliseNom non remplie
  if (!verifierRempli(baliseCategorie)) toutValide = false;//si baliseCategorie non remplie
  if (!verifierRempli(baliseVille)) toutValide = false;//si baliseVille non remplie
  if (!verifierRempli(baliseMessage)) toutValide = false;//si baliseMessage non remplie

  if (!verifierTel()) {// si baliseTel est incorrecte retourne une alerte
    errorMsg.textContent = " Le numero doit contenir 10 chiffres"
    toutValide = false;//et ToutValide = faux

    setTimeout(() => {//le message d'alerte s'efface au bout de 3 secondes
      errorMsg.textContent = "";
    }, 3000);
  }

  if (!verifierEmail()) {// si baliseEmail est incorrecte retourne une alerte
    errorMsg.textContent = "l'adresse mail est incorrecte"
    toutValide = false;//et ToutValide = faux

    setTimeout(() => {//le message d'alerte s'efface au bout de 3 secondes
      errorMsg.textContent = "";
    }, 3000);
  }


  else {
    errorMsg.textContent = "Formulaire transmis avec succès"
    setTimeout(() => {//le message d'alerte s'efface au bout de 3 secondes
      errorMsg.textContent = "";
    }, 3000);

    form.reset()// reset du formulaire envoyé avec succès donc toutValide est vrai
  }
})
