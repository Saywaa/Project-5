// Récupération de la chaîne de requête dans l'URL du navigateur et extraction de l'ID de l'URL.
const params = new URL(document.location).searchParams
const id = params.get("id")
const url = `http://localhost:3000/api/products/${id}`

// La fonction getProduct récupère les données du produit prédemment cliqué grâce à l'URL et l'ID spécifique
// pour ensuite l'afficher avec ses caractéristiques.
const getProduct = () => {
    fetch(url)
    .then (function (res) {
        return res.json()
    })
    .then (function (product) {
        const addTitle = document.getElementById("title").innerHTML = product.name
        const addPrice = document.getElementById("price").innerHTML = product.price
        const addImage = document.createElement("img")
        document.querySelector(".item__img").appendChild(addImage)
        addImage.setAttribute("src", `${product.imageUrl}`)
        addImage.setAttribute("alt", `${product.altTxt}`)
        const addDescription = document.getElementById("description").innerHTML = product.description
        // Le bout de code ci-dessous permet à l'utilisateur de choisir la couleur du produit dans un menu déroulant.
        const addColors = document.getElementById("colors")
        for (color in product.colors) {
            addColors.innerHTML += `<option value = "${product.colors[color]}">${product.colors[color]}</option>`
        }
    })
    // Une erreur s'affiche à l'écran si la connection à l'API est impossible.
    .catch ((error) => {
        window.alert('Connexion au serveur impossible !')
    })
}

getProduct()

// On déclare la constante "addToCart" qui correspond au bouton d'ajout au panier.
const addToCart = document.getElementById("addToCart")
// On déclare la variable "addLocalStorage" et "addLocalStorageUpdate" qui sont des tableaux
// qui vont contenir les produits ajoutés au panier.
addLocalStorage = []
addLocalStorageUpdate = []

// Le code ci-dessous nous permet d'enregistrer dans le local storage le produit, sa couleur et sa quantité
// lors du clique sur le bouton d'ajout au panier.
addToCart.addEventListener("click", () => {
    const createProduct = {
        quantity : document.getElementById("quantity").value,
        color : document.getElementById("colors").value,
        id : id
    }

    const productTitle = document.getElementById("title").innerHTML

    sameProduct = 0
    emptyLocalStorage = 0
    quantityIncorrect = 0
    colorIncorrect = 0

    // Tous les cas possibles sont traités dans le code ci-dessous.
    if (localStorage.getItem("Panier") !== null) {
        addLocalStorage = JSON.parse(localStorage.getItem("Panier"))
        addLocalStorageUpdate = addLocalStorage
    }

    if (document.getElementById("quantity").value > 100 | document.getElementById("quantity").value <= 0) {
        window.alert('Veuillez saisir une quantité comprise entre 1 et 100 inclus');
        quantityIncorrect = 1
    }
    else if (document.getElementById("colors").value === "") {
        window.alert('Veuillez choisir une couleur');
        colorIncorrect = 1
    }
    else if (localStorage.getItem("Panier") === null) {
        addLocalStorage.push(createProduct)
        localStorage.setItem("Panier", JSON.stringify(addLocalStorage))
        emptyLocalStorage = 1
    }
    else {
        for (i = 0; i < addLocalStorage.length; i++) {
            if (addLocalStorage[i].color === createProduct.color && addLocalStorage[i].id === createProduct.id) {
                if ((Number(addLocalStorage[i].quantity) + Number(createProduct.quantity)) > 100) {
                    addLocalStorageUpdate[i].quantity = "100"
                    window.alert('Vous ne pouvez pas acheter plus de 100 produits identiques');
                    sameProduct = 1
                }
                else {
                    addLocalStorageUpdate[i].quantity = String(Number(addLocalStorage[i].quantity) + Number(createProduct.quantity))
                    sameProduct = 1
                    window.alert('Vous avez ajouté ' + createProduct.quantity + ' ' + productTitle + ' de couleur ' + createProduct.color)
                }
            }
            else {
                addLocalStorageUpdate[i] = addLocalStorage[i]
            }
            localStorage.setItem("Panier", JSON.stringify(addLocalStorageUpdate))
        }
    }

    if (sameProduct === 0 && emptyLocalStorage === 0 && quantityIncorrect === 0 && colorIncorrect === 0) {
        addLocalStorage.push(createProduct)
        localStorage.setItem("Panier", JSON.stringify(addLocalStorage))
        window.alert('Vous avez ajouté ' + createProduct.quantity + ' ' + productTitle + ' de couleur ' + createProduct.color)
    }

    sameProduct = 0
})