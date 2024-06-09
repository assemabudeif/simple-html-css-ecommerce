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
        }
        );
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
        let productTitle = products[i].getElementsByClassName("product-title")[0].innerText;
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
                    let aPrice = a.getElementsByClassName("product-price")[0].innerText;
                    let bPrice = b.getElementsByClassName("product-price")[0].innerText;
                    return parseInt(aPrice) - parseInt(bPrice);
                }
            );
            break;
        case "price-desc":
            productsArray.sort(function (a, b) {
                let aPrice = a.getElementsByClassName("product-price")[0].innerText;
                let bPrice = b.getElementsByClassName("product-price")[0].innerText;
                return parseInt(bPrice) - parseInt(aPrice);
            }
            );
            break;
        case "name-asc":
            productsArray.sort(function (a, b) {
                let aName = a.getElementsByClassName("product-title")[0].innerText;
                let bName = b.getElementsByClassName("product-title")[0].innerText;
                return aName.localeCompare(bName);
            }
            );
            break;
        case "name-desc":
            productsArray.sort(function (a, b) {
                let aName = a.getElementsByClassName("product-title")[0].innerText;
                let bName = b.getElementsByClassName("product-title")[0].innerText;
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
        link.innerText = category.toUpperCase();
        link.className = "category";
        link.onclick = function () {
            localStorage.setItem("category", category);
        }
        categories.appendChild(link);
    }
});

