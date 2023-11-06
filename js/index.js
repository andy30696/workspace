
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});



// Entrega 7
// Mostrar nombre de usuario en el cabezal del index, luego de iniciar sesion
const username = document.getElementById('loginIndex');
const data = localStorage.getItem("inputText");
const perfil = document.getElementById('perfil');
//Funcionalidad de cerrar sesion

if (data) {
    username.textContent = data;
    perfil.style.display = "block";


} else {
    const opcionMenu = document.getElementById("btnCerrarSesion");
    username.textContent = "Login";
    opcionMenu.innerHTML = "Registrarse";
    perfil.style.display = "none";
}

const btnCerrarSesion = document.getElementById("btnCerrarSesion");

btnCerrarSesion.addEventListener("click", function () {
    localStorage.clear('inputText');
    window.location.href = "index.html";
});