let localStorageProducts = JSON.parse(localStorage.getItem("Panier"))
let i = 0

if ((localStorageProducts) === null) {
    document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">0</span> articles) : <span id="totalPrice">0</span> €</p>`
}

for (product of localStorageProducts) {
    fetch('http://localhost:3000/api/products/' + product.id)
    .then (function (res) {
        return res.json()
    })
    .then((dataProduct) => {
        localStorageProducts[i].imageUrl = dataProduct.imageUrl
        localStorageProducts[i].altTxt = dataProduct.altTxt
        localStorageProducts[i].name = dataProduct.name
        localStorageProducts[i].price = dataProduct.price
        document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id= ${localStorageProducts[i].id}  data-color= ${localStorageProducts[i].color}>
        <div class="cart__item__img">
            <img src=${localStorageProducts[i].imageUrl} alt=${localStorageProducts[i].altTxt}>
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${localStorageProducts[i].name}</h2>
                <p>Couleur du produit : ${localStorageProducts[i].color}</p>
                <p>Prix unitaire : ${localStorageProducts[i].price} €</p>
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
    modifQuantity()
    deleteProduct()
    totalPriceCalcul()
    i++
})
}

const totalPriceCalcul = () => {
    var totalQuantity = 0
    var totalPrice = 0
for (let i = 0; i < localStorageProducts.length; i++) {
    let quantityCartProduct = localStorageProducts[i].quantity
    totalQuantity += parseInt(quantityCartProduct)
    let priceCartProduct = localStorageProducts[i].price * localStorageProducts[i].quantity
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