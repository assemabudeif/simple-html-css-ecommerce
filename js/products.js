let category = localStorage.getItem("category");
let allProducts = [];
document.getElementById("category-title").innerText = category.toUpperCase();

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
    let prductsList = document.getElementById("product-list");
    let productItemDiv = document.createElement("div");
    productItemDiv.className = "product-item";
    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.image;
    productItemDiv.appendChild(productImage);
    let productTitle = document.createElement("h3");
    productTitle.innerText = product.title;
    productTitle.className = 'product-title';
    productItemDiv.appendChild(productTitle);
    let productDescription = document.createElement("p");
    productDescription.innerText = product.description;
    productItemDiv.appendChild(productDescription);
    let productPrice = document.createElement("p");
    productPrice.innerText = product.price + "$";
    productPrice.className = "product-price";
    productItemDiv.appendChild(productPrice);
    let productButton = document.createElement("button");
    productButton.innerText = "Add to Cart";
    productButton.onclick = function () {
        addCart(product);
    }
    productItemDiv.appendChild(productButton);
    prductsList.appendChild(productItemDiv);
}

/**
 * @param {*} product
 * Add the product to the cart
 * If the product is already added to the cart, it will show an alert message
 * If the product is added to the cart successfully, it will show an alert message
 * Cart is stored in the local storage
 * */
function addCart(product) {
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
}