// On déclare la constante "url" qui correspond à l'API contenant toutes les données nécéssaires à l'affichage des produits.
const url = "http://localhost:3000/api/products/"

// On déclare la constante "cardContainer" qui correspond à l'emplacement dans lequel on va afficher
// nos produits, sur la page d'accueil.
const cardContainer = document.getElementById("items")

// On déclare la fonction "getProducts" qui récupère les données des produits puis les affiche dans
// la section "cardContainer" avec leurs caractéristiques.
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
    // Une erreur s'affiche à l'écran si la connection à l'API est impossible.
    .catch ((error) => {
        window.alert('Connexion au serveur impossible !');
    })
}

getProducts()