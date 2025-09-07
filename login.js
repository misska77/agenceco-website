function initFormulaire() {
}
initFormulaire()

const form = document.querySelector("form")
const email = document.getElementById("email").value
const password = document.getElementById("password").value
form.addEventListener("submit", (event) => {
    event.preventDefault()
})

async function postLogin () {
    console.log("postLogin")
}