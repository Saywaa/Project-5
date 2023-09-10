// On déclare le tableau "localStorageProducts" qui récupère toutes les infos du local storage.
let localStorageProducts = JSON.parse(localStorage.getItem("Panier"))
// On déclare le tableau "products" qui récupèrera tous les IDs des produits contenus dans le panier.
let products = []

// Si le local storage est vide, le panier l'est donc aussi, on affiche donc 0 article et 0 €.
if ((localStorageProducts) === null) {
    document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">0</span> article) : <span id="totalPrice">0</span> €</p>`
}

// La fonction "getData" récupère les informations du produit avec son ID dans l'API et retourne ses caractéristiques.
function getData (productId) {
    res = fetch ('http://localhost:3000/api/products/' + productId)
    .then (data => {
        return data.json()
    })
    // Une erreur s'affiche à l'écran si la connection à l'API est impossible.
    .catch ((error) => {
        window.alert('Connexion au serveur impossible !')
    })
    return res
}

// La fonction "displayCart" affiche tous les produits contenus dans le panier avec leurs caractéristiques respectives.
async function displayCart () {
    for (let i = 0; i < localStorageProducts.length; i++) {
        let product = localStorageProducts[i]
        productData = await getData(product.id)
        document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id= ${localStorageProducts[i].id}  data-color= ${localStorageProducts[i].color}>
        <div class="cart__item__img">
            <img src=${productData.imageUrl} alt=${productData.altTxt}>
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${productData.name}</h2>
                <p>Couleur du produit : ${localStorageProducts[i].color}</p>
                <p>Prix unitaire : ${productData.price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p> Qté : ${localStorageProducts[i].quantity} </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${localStorageProducts[i].quantity}>
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
    products.push(localStorageProducts[i].id)
    modifQuantity()
    deleteProduct()
    totalPriceCalcul()
}}

displayCart ()

// "totalPriceCalcul" vient calculer la valeur et la quantité totale des produits du panier puis l'affiche en bas de la page.
const totalPriceCalcul = () => {
    var totalQuantity = 0
    var totalPrice = 0
for (let i = 0; i < localStorageProducts.length; i++) {
    let quantityCartProduct = localStorageProducts[i].quantity
    totalQuantity += parseInt(quantityCartProduct)
    let priceCartProduct = productData.price * localStorageProducts[i].quantity
    totalPrice += priceCartProduct
    }
    document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">${totalQuantity}</span> articles) : <span id="totalPrice">${totalPrice}</span> €</p>`
}

// "modifQuantity" permet de modifier la quantité des produits présents dans le panier. La modification est aussi faite dans le local storage.
function modifQuantity () {
    let inputQuantity = Array.from(document.querySelectorAll(".cart__item__content__settings__quantity input"))
    let valueQuantity = Array.from(document.querySelectorAll('.itemQuantity'))
    for (let i = 0; i < inputQuantity.length; i++) {
        inputQuantity[i].addEventListener("change", () => {
        uptadedLocalStorage = localStorageProducts
        for (let i = 0; i < uptadedLocalStorage.length; i++) {
            delete uptadedLocalStorage[i].imageUrl
            delete uptadedLocalStorage[i].altTxt
            delete uptadedLocalStorage[i].name
            delete uptadedLocalStorage[i].price
        }
        uptadedLocalStorage[i].quantity = valueQuantity[i].value
        localStorage.setItem("Panier", JSON.stringify(uptadedLocalStorage))
        window.location.reload()
        totalPriceCalcul()
        })
    }
}

// "deleteProduct" permet de supprimer totalement un produit du panier. La suppression est aussi faite dans le local storage.
function deleteProduct() {
    let suppButton = Array.from(document.querySelectorAll(".deleteItem"))
    let newLocalStorage = []
        for (let i = 0; i < suppButton.length; i++) {
            suppButton[i].addEventListener("click", () => {
            suppButton[i].style.display = "none"
            newLocalStorage = localStorageProducts
            for (let i = 0; i < newLocalStorage.length; i++) {
                delete newLocalStorage[i].imageUrl
                delete newLocalStorage[i].altTxt
                delete newLocalStorage[i].name
                delete newLocalStorage[i].price
            }
            newLocalStorage.splice([i], 1)
            localStorageProducts = localStorage.setItem("Panier", JSON.stringify(newLocalStorage))
            window.location.reload()
        })
    }
}

// On déclare la constante "btnForm" qui correspond au bouton commander.
const btnForm = document.getElementById('order')

// Au clique du bouton commander, on crée l'objet "contact" qui contient les informations du client
// rentrées par ce dernier dans le formulaire.
btnForm.addEventListener ('click', (e) => {
    e.preventDefault()
    const contact = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city').value,
        email : document.getElementById('email').value,
    }

    // Les multiples fonctions ci-dessous vont vérifier que chaque input dans le formulaire sont validés par le regex
    // et sont donc autorisés à être envoyer à l'API.
    function controlFirstName () {
        const firstName = contact.firstName
        const inputFirstName = document.getElementById('firstName')
        if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(firstName)) {
            inputFirstName.style.border = "solid 2px green"
            document.getElementById('firstNameErrorMsg').textContent = ""
            return true
        } 
        else {
            inputFirstName.style.border = "solid 2px red"
            document.getElementById('firstNameErrorMsg').textContent = "Le prénom du formulaire est invalide, ex: Alexandre"
            return false
        }
    }

    function controlLastName () {
        const lastName = contact.lastName
        let inputLastName = document.getElementById('lastName')
        if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(lastName)) {
            inputLastName.style.border = "solid 2px green"
            document.getElementById('lastNameErrorMsg').textContent = ""
            return true
        } 
        else {
            inputLastName.style.border = "solid 2px red"
            document.getElementById('lastNameErrorMsg').textContent = "Le nom du formulaire est invalide, ex: Dumas"
            return false
        }
    }

    function controlAddress () {
        const address = contact.address
        let inputAddress = document.getElementById('address')
        if (/^[A-Za-z0-9\s]{5,100}$/.test(address)) {
            inputAddress.style.border = "solid 2px green"
            document.getElementById('addressErrorMsg').textContent = ""
            return true
        }
        else {
            inputAddress.style.border = "solid 2px red"
            document.getElementById('addressErrorMsg').textContent = "L'adresse du formulaire est invalide, ex: 10 Rue du Rocher"
            return false
        }
    }

    function controlCity () {
        const city = contact.city
        let inputCity = document.getElementById('city')
        if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(city)) {
            inputCity.style.border = "solid 2px green"
            document.getElementById('cityErrorMsg').textContent = ""
            return true
        } 
        else {
            inputCity.style.border = "solid 2px red"
            document.getElementById('cityErrorMsg').textContent = "La ville du formulaire est invalide, ex: Paris"
            return false
        }
    }

    function controlEmail () {
        const email = contact.email
        let inputEmail = document.getElementById('email')
        if (/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(email)) {
            inputEmail.style.border = "solid 2px green"
            document.getElementById('emailErrorMsg').textContent = ""
            return true
        } 
        else {
            inputEmail.style.border = "solid 2px red"
            document.getElementById('emailErrorMsg').textContent = "L'email du formulaire est invalide, ex: openclassrooms@contact.fr"
            return false
        }
    }

    // Si tout les inputs sont validés, on enregistre dans le local storage l'objet "contact".
    // Ensuite on appel la fonction "sendToServer".
    if (controlFirstName() && controlLastName() && controlAddress() && controlCity() && controlEmail()) {
        localStorage.setItem("Contact", JSON.stringify(contact))
        sendToServer()
    }
    // Si le formulaire n'est pas correctement rempli, on affiche une erreur.
    else {
        window.alert('Veuillez remplir correctement le formulaire')
    }

    // On déclare la variable "orderId" qui va contenir le numéro de la commande.
    var orderId = ""

    // La fonction "sendToServer" va poster l'objet "contact" et le tableau "products" dans l'API.
    // Ensuite, l'API nous renvoie sur la page de confirmation de la commande
    // grâce au numéro de cette dernière crée par l'API elle-même.
    function sendToServer() {
        fetch ('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({contact, products}),
        })
        .then ((res) => {
            return res.json()
        })
        .then ((server) => {
            orderId = server.orderId
            if (orderId != undefined) {
            location.href = 'confirmation.html?id=' + orderId
            }
        })
    }
})