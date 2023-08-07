let localStorageProducts = JSON.parse(localStorage.getItem("Panier"))

let i = 0;

for (product of localStorageProducts) {
    fetch('http://localhost:3000/api/products/' + product.id)
    .then (function (res) {
        return res.json()
    })
    .then((dataProduct) => {
        localStorageProducts[i].imageUrl = dataProduct.imageUrl;
        localStorageProducts[i].altTxt = dataProduct.altTxt;
        localStorageProducts[i].name = dataProduct.name;
        localStorageProducts[i].price = dataProduct.price;
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
    i++;
})
}

