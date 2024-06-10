// General Auth
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

// Register Module
let registerForm = document.getElementById("register-form");
let registerUsernameInput = document.getElementById("register-username");
let registerPasswordInput = document.getElementById("register-password");
let registerConfirmPasswordInput = document.getElementById("register-confirm-password");
let registerUsernameValidation = document.getElementById("register-username-validation");
let registerPasswordValidation = document.getElementById("register-password-validation");
let registerConfirmPasswordValidation = document.getElementById("register-confirm-password-validation");

function checkRegisterUserName(userNameFound) {
    if (userNameFound) {
        registerUsernameValidation.innerHTML = "this username is used, please enter another";
        return false;
    } else if (!testkUserName(registerUsernameInput.value)) {
        registerUsernameValidation.innerHTML = "Please Enter Valid Username, valid username must start with small letter and contain at least 3 characters and can contain numbers and @ only.";
        return false;
    } else {
        registerUsernameValidation.innerHTML = "";
        return true;
    }
}

function checkRegisterPassword() {
    if (!testPassword(registerPasswordInput.value)) {
        registerPasswordValidation.innerHTML = "Password must be greater than 5 characters";
        return false;
    } else {
        registerPasswordValidation.innerHTML = "";
        return true;
    }
}

function checkRegisterConfirmPassword() {
    if (registerConfirmPasswordInput.value !== registerPasswordInput.value) {
        registerConfirmPasswordValidation.innerHTML = "Not Match";
        return false;
    } else {
        registerConfirmPasswordValidation.innerHTML = "";
        return true;
    }
}

function register() {
    let userModel = {
        "username": registerUsernameInput.value,
        "password": registerPasswordInput.value,
    };
    users.push(userModel);
    localStorage.setItem(userKey, JSON.stringify(users));
    registerForm.submit();

}


registerForm.addEventListener(
    'submit',
    (event) => {
        event.preventDefault();
        let userNameFound = false;


        for (const user of users) {
            if (user.username === registerUsernameInput.value) {
                userNameFound = true;
                break;
            }
        }
        if (checkRegisterUserName(userNameFound) && checkRegisterPassword()
            && checkRegisterConfirmPassword()) {
            register();
        }
    }
);

