const params = new URLSearchParams(window.location.search)

const id = params.get("id")

fetch(`http://localhost:3000/articles/${id}`)
    .then(res => res.json())
    .then(article => {
        const container = document.getElementById("detail-container")

        container.innerHTML =
            <h3>${article.title}</h3>,
            <p>${article.description}</p>,
            <p>${article.content}</p>,
            <p><strong>Date :</strong>${article.publicationDate}</p>
    })

    .catch(err =>
    console.error(err))