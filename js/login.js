const passwordField = document.getElementById("passwordField"); // Obtiene un elemento del DOM con el ID passwordField.
const togglePassword = document.getElementById("togglePassword"); // Obtiene un elemento del DOM con el ID togglePassword.

// const showPasswordCheckbox = document.getElementById('showPassword');

// Alternar la Visibilidad de la Contraseña.

togglePassword.addEventListener("click", function () {
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
});

// Proceso de Inicio de Sesión
// Captura nuestro boton de login.
document.querySelector(".login_btn").addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.querySelector("input[type='email']").value;
    const password = passwordField.value;

    // El trim verifa que no haya espacios en blanco o que no contengan @.
    if (email.trim() === "" || password.trim() === "" || !validateEmail(email)) {
        alert("Verifique los datos");
        // Ahora lo redirijimos a la pagina principal.
    } else {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    }
});
// Esta funcion verifica que este el "@" en el campo email.
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/* Agregar en la esquina derecha el nombre del usuario ingresada en la pantalla de inicio de sesión,
 haciendo uso del LocalStorage */


//Almacenamos el email en local storage
const btn = document.getElementById('login');
const inputText = document.getElementById('email');

btn.addEventListener("click", () => {
    let inputValue = inputText.value;
    localStorage.setItem('inputText', inputValue);

    console.log(localStorage.getItem("inputText"));

});


//ModoNocturno

const dark = "background: #1f1f1f; color: white;";
const light = "background: white; color: black;";

let currentMode = "light";

function changeMode(mode) {
    currentMode = mode;
    document.body.style.cssText = mode === "light" ? light : dark;
}

const modeButton = document.getElementById("darkMode");
modeButton.addEventListener("click", () => {
    changeMode(currentMode === "light" ? "dark" : "light");
});
changeMode(mode);



