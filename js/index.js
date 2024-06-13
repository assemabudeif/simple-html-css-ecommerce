let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let loginButton = document.getElementById("login-button");
let logoutButton = document.getElementById("logout-button");
let registerButton = document.getElementById("register-button");

if (currentUser) {
    loginButton.style.display = "none";
    registerButton.style.display = "none";
    logoutButton.style.display = "inline";
    document.getElementById("username").innerHTML = `Welcome ${currentUser.username}`;
} else {
    loginButton.style.display = "inline";
    registerButton.style.display = "inline";
    logoutButton.style.display = "none";
}
/**
 * Fetch the products from the fakestoreapi
 * Add the products to the product list
 */
let allProducts = [];
function getAllProducts() {
    fetch('https://fakestoreapi.com/products').then(result => result.json())
        .then((products) => {
            allProducts = products;
            document.getElementById("product-list").innerHTML = "";
            for (const product of products) {
                addProductItem(product);
            }
        });
}
getAllProducts();

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
    open("./html/product-details.html", "_self");
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
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart == null) {
            cart = [];
        }
        let cartItem = cart.find(item => item.product.id == product.id);
        if (cartItem) {
            cartItem.quantity++;
            alert(`This product is already in the cart. Quantity: ${cartItem.quantity}`);
        } else {
            cart.push({ product, quantity: 1 });
            alert("Product added to cart successfully");
        }
        localStorage.setItem("cart", JSON.stringify(cart));

    } else {
        alert("Please login to add product to cart");
    }

}

/**
 * Search the product based on the search value
 * It will search the product based on the product title
 * If the product title contains the search value, it will show the product
 * If the product title does not contain the search value, it will hide the product
 * */
function searchProduct() {
    console.log("searchProduct");
    let searchValue = document.getElementById("searchValue").value;
    let products = document.getElementsByClassName("product-item");
    for (let i = 0; i < products.length; i++) {
        let productTitle = products[i].getElementsByClassName("product-title")[0].innerHTML;
        if (productTitle.includes(searchValue)) {
            products[i].style.display = "block";
        } else {
            products[i].style.display = "none";
        }
    }
}

/**
 * Event Listeners
 * Search the product based on the search value
 * Sort the product based on the selected value
 * */
document.getElementById("searchValue").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        searchProduct();
        this.blur();
    }
});

document.getElementById("btnSearch").addEventListener("click", searchProduct);


/**
 * Sort the product based on the selected value
 * It will sort the product based on the price and name
 * It will sort the product in ascending and descending order
 * */
document.getElementById("sort").addEventListener("change", function () {
    let sortValue = document.getElementById("sort").value;
    let products = document.getElementsByClassName("product-item");
    let productsArray = Array.from(products);
    let isDefault = false;
    switch (sortValue) {
        case "price-asc":
            productsArray.sort(
                function (a, b) {
                    let aPrice = a.getElementsByClassName("product-price")[0].innerHTML;
                    let bPrice = b.getElementsByClassName("product-price")[0].innerHTML;
                    return parseInt(aPrice) - parseInt(bPrice);
                }
            );
            break;
        case "price-desc":
            productsArray.sort(function (a, b) {
                let aPrice = a.getElementsByClassName("product-price")[0].innerHTML;
                let bPrice = b.getElementsByClassName("product-price")[0].innerHTML;
                return parseInt(bPrice) - parseInt(aPrice);
            }
            );
            break;
        case "name-asc":
            productsArray.sort(function (a, b) {
                let aName = a.getElementsByClassName("product-title")[0].innerHTML;
                let bName = b.getElementsByClassName("product-title")[0].innerHTML;
                return aName.localeCompare(bName);
            }
            );
            break;
        case "name-desc":
            productsArray.sort(function (a, b) {
                let aName = a.getElementsByClassName("product-title")[0].innerHTML;
                let bName = b.getElementsByClassName("product-title")[0].innerHTML;
                return bName.localeCompare(aName);
            }
            );
            break;
        case "default-select":
            console.log("default-select" + allProducts.length);
            document.getElementById("product-list").innerHTML = "";
            for (const product of allProducts) {
                addProductItem(product);
            }
            isDefault = true;
            break;
    }
    if (isDefault) {
        return;
    }
    document.getElementById("product-list").innerHTML = "";
    for (const product of productsArray) {
        document.getElementById("product-list").appendChild(product);
    }
});


/**
 * Fetch the categories from the fakestoreapi
 * Add the categories to the categories list
 */
function getAllCategories() {
    return fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .catch(err => console.error(err));
}

getAllCategories().then(data => {
    // console.log(data);
    let categories = document.getElementById("categories");
    for (const category of data) {
        let link = document.createElement("a");
        link.href = "html/products.html";
        link.innerHTML = category.toUpperCase();
        link.className = "category";
        link.onclick = function () {
            localStorage.setItem("category", category);
        }
        categories.appendChild(link);
    }
});

/**
 * Event Listeners
 * Logout the user
 * */

document.getElementById("logout-button").addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    location.reload();
}
);
