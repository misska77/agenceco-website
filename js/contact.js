// Gestion du formulaire de contact //
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.formContact');
  const errorMsg = document.getElementById('errorMsg');
  const successMsg = document.getElementById('successMsg');

  const telephoneInput = document.getElementById('telephone');
  const emailInput = document.getElementById('email');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telRegex = /^[0-9]{10}$/;

  // Efface le message d’erreur dès que l’utilisateur corrige son numéro
  telephoneInput.addEventListener('input', function () {
    if (telRegex.test(telephoneInput.value.trim())) {
      errorMsg.textContent = "";
    }
  });

  // Efface le message d’erreur dès que l’utilisateur corrige son email
  emailInput.addEventListener('input', function () {
    if (emailRegex.test(emailInput.value.trim())) {
      errorMsg.textContent = "";
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const categorie = document.getElementById('categorie').value.trim();
    const telephone = telephoneInput.value.trim();
    const ville = document.getElementById('ville').value.trim();
    const email = emailInput.value.trim();
    const message = document.getElementById('message').value.trim();

    if (!telRegex.test(telephone)) {
      errorMsg.textContent = "Le numéro de téléphone n'est pas valide.";
      successMsg.textContent = "";
      return;
    }

    if (!emailRegex.test(email)) {
      errorMsg.textContent = "L'adresse email n'est pas valide.";
      successMsg.textContent = "";
      return;
    }

    // Si tout est valide
    errorMsg.textContent = "";
    successMsg.textContent = "Formulaire envoyé avec succès !";

    form.reset();

    // Disparition du message de succès après 3 secondes
    setTimeout(() => {
      successMsg.textContent = "";
    }, 3000);
  });
});