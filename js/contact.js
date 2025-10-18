//Gestion du formulaire de contact//
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.formContact');
  const errorMsg = document.getElementById('errorMsg');
  const successMsg = document.getElementById('successMsg');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const categorie = document.getElementById('categorie').value.trim();
    const telephone = document.getElementById('telephone').value.trim();
    const ville = document.getElementById('ville').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telRegex = /^[0-9]{10}$/;

    if (!telRegex.test(telephone)) {
      errorMsg.textContent = "Le numéro de téléphone n'est pas valide";
      successMsg.textContent = "";
      return;
    }

    if (!emailRegex.test(email)) {
      errorMsg.textContent = "L'adresse email n'est pas valide.";
      successMsg.textContent = "";
      return;
    }

    successMsg.textContent = "Formulaire envoyé avec succès !";
    form.reset();

    setTimeout(() => {
      successMsg.textContent = "";
    }, 3000);

  });
});