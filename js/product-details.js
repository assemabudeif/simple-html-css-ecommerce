// Purpose: To display the product details on the product details page
let product = JSON.parse(localStorage.getItem("product"));

// Product Image Element
let productImage = document.getElementById("product-image");
productImage.src = product.image;

// Product Title Element
let productTitle = document.getElementById("product-title");
productTitle.innerHTML = product.title;

// Product Description Element
let productDescription = document.getElementById("product-description");
productDescription.innerHTML = product.description;

// Product Price Element
let productPrice = document.getElementById("product-price");
productPrice.innerHTML = product.price + "$";

// Product Rating Element
let productRating = document.getElementById("product-rate-number");
productRating.innerHTML = product.rating.rate;

// Product Rating Count Element
let productRatingCount = document.getElementById("product-rate-count");
productRatingCount.innerHTML = `(${product.rating.count})`;


// Product Caregory Element
let productCategory = document.getElementById("product-category-item");
productCategory.innerHTML = product.category;
productCategory.onclick = function () {
    localStorage.setItem("category", product.category);
}


// Product Quantity Element
let productQuantityInput = document.getElementById("product-quantity");

// Add to Cart Button Element
let addToCartButton = document.getElementById("product-cart-button");
addToCartButton.onclick = function () {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null) {
        cart = [];
    }
    let cartItem = cart.find(item => item.product.id == product.id);
    if (cartItem) {
        cartItem.quantity += parseInt(productQuantityInput.value);
        alert(`This product is already in the cart. Quantity: ${cartItem.quantity}`);
    } else {
        cart.push({ product, quantity: parseInt(productQuantityInput.value) });
        alert("Product added to cart successfully");

    }
    localStorage.setItem("cart", JSON.stringify(cart));
    productQuantityInput.value = 1;
}
