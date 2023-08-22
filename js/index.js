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



// Mostrar nombre de usuario en el cabezal del index, luego de iniciar sesion
const username = document.getElementById('loginIndex');
const data = localStorage.getItem("inputText");

if (data) {
    username.textContent = data;
} else {
    username.textContent = "Registrate";
}