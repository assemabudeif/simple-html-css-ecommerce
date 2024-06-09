const userKey = "users";
let users = JSON.parse(localStorage.getItem(userKey));
if (users == null)
    users = [];

let regUsername = /^[a-z][a-zA-Z0-9@]{2,}$/;
let regPassword = /^.{6,}$/;

function testkUserName(username) {
    return regUsername.test(username)
}

function testPassword(password) {
    return regPassword.test(password)
}

// Login Module
let loginForm = document.getElementById("login-form");
let loginUsernameInput = document.getElementById("login-username");
let loginPasswordInput = document.getElementById("login-password");
let loginUsernameValidation = document.getElementById("login-username-validation");
let loginPasswordValidation = document.getElementById("login-password-validation");

function login() {

    let userModel = {
        "username": loginUsernameInput.value,
        "password": loginPasswordInput
    };
    localStorage.setItem("currentUser", JSON.stringify(userModel));
    loginForm.submit();
}

function checkLoginUserName() {
    if (checkUserNameFounded()) {
        loginUsernameValidation.innerHTML = "not found username, please enter another, or register";
        return false;
    } else if (!testkUserName(loginUsernameInput.value)) {
        loginUsernameValidation.innerHTML = "Please Enter Valid Username like: (ahmed2@)";
        return false;
    } else {
        registerUsernameValidation = "";
        return true;
    }
}

function checkLoginPassword() {
    let correctPassword = false;
    for (const user of users) {
        if (user.username === loginUsernameInput.value && user.password === loginPasswordInput.value) {
            correctPassword = true;
            break;
        }
    }

    if (!testPassword(loginPasswordInput.value)) {
        loginPasswordValidation.innerHTML = "Password must be greater than 5 characters";
        return false;
    } else if (!correctPassword) {
        loginPasswordValidation.innerHTML = "Password is incorrect";
        return false;
    } else {
        loginPasswordValidation.innerHTML = "";
        return true;
    }
}

function checkUserNameFounded() {
    let notFoundUserName = true;
    for (const user of users) {
        if (user.username === loginUsernameInput.value) {
            notFoundUserName = false;
            break;
        }
    }
    return notFoundUserName;
}

loginForm.addEventListener(
    'submit',
    (event) => {
        event.preventDefault();
        const userNameValid = checkLoginUserName();
        const passswordValid = checkLoginPassword();
        if (userNameValid && passswordValid) {
            login();
        }
    }
);
