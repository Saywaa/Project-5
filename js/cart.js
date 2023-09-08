let localStorageProducts = JSON.parse(localStorage.getItem("Panier"))
let products = []


if ((localStorageProducts) === null) {
    document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">0</span> articles) : <span id="totalPrice">0</span> €</p>`
}

function getData (productId) {
    res = fetch ('http://localhost:3000/api/products/' + productId)
    .then (data => {
        return data.json()
    })
    .catch (error => {
        error = `Une erreur s'est produite au chargement de la page, veuillez réessayer.`;
        alert(error)
    })
    return res
}

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

const btnForm = document.getElementById('order')

btnForm.addEventListener ('click', (e) => {
    e.preventDefault()
    const contact = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city').value,
        email : document.getElementById('email').value,
    }

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

    if (controlFirstName() && controlLastName() && controlAddress() && controlCity() && controlEmail()) {
        localStorage.setItem("Contact", JSON.stringify(contact))
        sendToServer()
    }
    else {
        window.alert('Veuillez remplir correctement le formulaire');
    }

    var orderId = ""

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