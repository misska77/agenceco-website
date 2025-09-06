function initFormulaire() {
}
initFormulaire()

const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()
})

async function postLogin() {
  console.log("postLogin")
  let response = await fetch("http://localhost:3000/login");
  let  = await response.json();
  return ;
}