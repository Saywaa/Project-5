let url = new URLSearchParams(document.location.search)
let id = url.get("id")
const orderId = id
const idConfirm = document.getElementById('orderId')
idConfirm.innerHTML = `<span id="orderId"><strong>${orderId}</strong>`
localStorage.clear()