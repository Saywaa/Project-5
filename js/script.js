const url = "http://localhost:3000/api/products/"
const cardContainer = document.getElementById("items")

const getProducts = () => {
    fetch (url)
    .then (function (res) {
        return res.json()
    })
    .then (function (listProducts) {
        for (product in listProducts) {
            cardContainer.innerHTML += `<a href="./product.html?id=${listProducts[product]._id}">
                <article>
                    <img src="${listProducts[product].imageUrl}" alt="${listProducts[product].altTxt}">
                    <h3 class="productName">${listProducts[product].name}</h3>
                    <p class="productDescription">${listProducts[product].description}</p>
                </article>
            </a>`
        }
    })
    .catch ((error) => {
        window.alert('Connexion au serveur impossible !');
    })
}

getProducts()