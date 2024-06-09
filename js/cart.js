let cart = JSON.parse(localStorage.getItem("cart"));
if (cart == null) {
    cart = [];
}
console.log(cart);

let cartItems = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");

function loadCart() {

    cartItems.innerHTML = "";
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        let cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        let cartItemImage = document.createElement("img");
        cartItemImage.src = cart[i].image;
        cartItemImage.alt = cart[i].image;
        cartItemImage.height = "150";
        cartItemDiv.appendChild(cartItemImage);
        let cartItemTitle = document.createElement("h3");
        cartItemTitle.innerText = cart[i].title;
        cartItemDiv.appendChild(cartItemTitle);
        let cartItemPrice = document.createElement("p");
        cartItemPrice.innerText = cart[i].price + "$";
        total += cart[i].price;
        cartItemDiv.appendChild(cartItemPrice);
        let cartItemRemove = document.createElement("button");
        cartItemRemove.innerText = "Remove";
        cartItemRemove.onclick = function () {
            removeItem(i);
        }
        cartItemDiv.appendChild(cartItemRemove);
        cartItems.appendChild(cartItemDiv);
    }
    cartTotal.innerText = total + "$";
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

loadCart();
