let category = localStorage.getItem("category");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

let allProducts = [];
document.getElementById("category-title").innerHTML = category.toUpperCase();

function getCategoryProducts() {
    return fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .catch(err => console.error(err));
}

getCategoryProducts().then(data => {
    allProducts = data;
    for (const product of data) {
        addProductItem(product);
    }
});

/**
 * @param {*} product
 * Add Product Item to the product list
 * Product Item contains Image, Title, Description, Price and Add to Cart Button
 * Add to Cart Button will add the product to the cart
 * Cart is stored in the local storage
 * If the product is already added to the cart, it will show an alert message
 * If the product is added to the cart successfully, it will show an alert message
 */
function addProductItem(product) {
    /// <div class="product-item">
    let prductsList = document.getElementById("product-list");
    let productItemDiv = document.createElement("div");
    productItemDiv.className = "product-item";

    /// <img src="product.image" alt="product.image">
    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.image;
    productItemDiv.appendChild(productImage);

    /// <h3 class="product-title">product.title</h3>
    let productTitle = document.createElement("h3");
    productTitle.innerHTML = product.title;
    productTitle.className = 'product-title';
    productItemDiv.appendChild(productTitle);

    /// <p class="product-description">product.description</p>
    let productPrice = document.createElement("p");
    productPrice.innerHTML = product.price + "$";
    productPrice.className = "product-price";
    productItemDiv.appendChild(productPrice);

    /// <div class="product-buttons"></div>
    let productButtons = document.createElement("div");
    productButtons.className = "product-buttons";

    /// <button class="details-button">Show Details</button>
    let productDetails = document.createElement("button");
    productDetails.className = "details-button"
    productDetails.innerHTML = "Show Details";
    productDetails.onclick = function () {
        showDetails(product);
    }
    productButtons.appendChild(productDetails);

    /// <button class="cart-button">Add to Cart</button>
    let productCart = document.createElement("button");
    productCart.className = "cart-button"
    productCart.innerHTML = "Add to Cart";
    productCart.onclick = function () {
        addCart(product);
    }
    productButtons.appendChild(productCart);

    productItemDiv.appendChild(productButtons);
    prductsList.appendChild(productItemDiv);
}

function showDetails(product) {
    localStorage.setItem("product", JSON.stringify(product));
    open("../html/product-details.html", "_self");
}
/**
 * @param {*} product
 * Add the product to the cart
 * If the product is already added to the cart, it will show an alert message
 * If the product is added to the cart successfully, it will show an alert message
 * Cart is stored in the local storage
 * */
function addCart(product) {
    if (currentUser) {
        let cartList = localStorage.getItem("cart");
        let itemIsFound = false;
        if (cartList == null) {
            cartList = [];
        } else {
            cartList = JSON.parse(cartList);
        }
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].id == product.id) {
                itemIsFound = true;
                alert("Product already added to cart");
                break;
            }
        }
        if (!itemIsFound) {
            cartList.push(product);
            localStorage.setItem("cart", JSON.stringify(cartList));
            alert("Product added to cart successfully");
        }
    } else {
        alert("Please login to add product to cart");
    }
}