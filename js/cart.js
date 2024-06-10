let cart = JSON.parse(localStorage.getItem("cart"));
if (cart == null) {
    cart = [];
}
console.log(cart);

let cartItems = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total-price");

function loadCart() {
    cartItems.innerHTML = "";
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        let product = cart[i].product;

        // Cart Item Div
        let cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        cartItemDiv.style.position = "relative";


        // Cart Item Details Div
        let cartItemDetailsDiv = document.createElement("div");
        cartItemDetailsDiv.className = "cart-item-details";

        // Cart Item Image
        let cartItemImage = document.createElement("img");
        cartItemImage.src = product.image;
        cartItemImage.alt = product.image;
        cartItemImage.height = "150";
        cartItemDetailsDiv.appendChild(cartItemImage);

        // Cart Item Title
        let cartItemTitle = document.createElement("h3");
        cartItemTitle.innerHTML = product.title;
        cartItemDetailsDiv.appendChild(cartItemTitle);

        // Cart Item Price
        let cartItemPrice = document.createElement("p");
        cartItemPrice.innerHTML = product.price + "$";
        total += product.price * cart[i].quantity;
        cartItemDetailsDiv.appendChild(cartItemPrice);

        // Cart Item Reove Button
        let cartItemRemove = document.createElement("button");
        cartItemRemove.innerHTML = "Remove";
        cartItemRemove.onclick = function () {
            removeItem(i);
        }
        cartItemDetailsDiv.appendChild(cartItemRemove);
        cartItems.appendChild(cartItemDiv);
        cartItemDiv.appendChild(cartItemDetailsDiv);

        // Cart Item Quantity Div
        let cartItemQuantityDiv = document.createElement("div");
        cartItemQuantityDiv.className = "cart-item-quantity";
        cartItemQuantityDiv.style.position = "absolute";
        cartItemQuantityDiv.style.right = "5%";
        cartItemQuantityDiv.style.bottom = "10%";
        cartItemQuantityDiv.style.width = "15%";
        cartItemQuantityDiv.style.height = "15%";

        // Cart Item Quantity Label
        let cartItemQuantityLabel = document.createElement("label");
        cartItemQuantityLabel.innerHTML = `Quantity: &#160;`;
        cartItemQuantityLabel.style.width = "30%";
        cartItemQuantityLabel.style.height = "80%";
        cartItemQuantityLabel.style.textAlign = "start";
        cartItemQuantityLabel.style.margin = "auto";
        cartItemQuantityDiv.appendChild(cartItemQuantityLabel);

        // Cart Item Quantity Input
        let cartItemQuantityInput = document.createElement("input");
        cartItemQuantityInput.type = "number";
        cartItemQuantityInput.min = 1;
        cartItemQuantityInput.value = cart[i].quantity;
        cartItemQuantityInput.style.width = "70%";
        cartItemQuantityInput.style.height = "80%";
        cartItemQuantityInput.style.textAlign = "center";
        cartItemQuantityInput.style.margin = "auto";
        cartItemQuantityInput.style.border = " 2px solid #ccc";
        cartItemQuantityInput.style.borderRadius = "10px";

        cartItemQuantityInput.onchange = function () {
            cart[i].quantity = parseInt(cartItemQuantityInput.value);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }
        cartItemQuantityDiv.appendChild(cartItemQuantityInput);
        cartItemDiv.appendChild(cartItemQuantityDiv);

    }
    cartTotal.innerHTML = Math.round(total) + "$";
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}



loadCart();