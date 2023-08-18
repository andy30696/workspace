const passwordField = document.getElementById("passwordField"); // Obtiene un elemento del DOM con el ID passwordField.
const togglePassword = document.getElementById("togglePassword"); // Obtiene un elemento del DOM con el ID togglePassword.

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