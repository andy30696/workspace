// Obtiene los elementos de los campos de entrada
const emailInput = document.getElementById('perfilEmail');
const nombreInput = document.getElementById('nameForm');
const apellidoInput = document.getElementById('lastNameForm');
const segundoNombre = document.getElementById('secondNameForm');
const segundoApellido = document.getElementById('secondLastNameForm');
const telefono = document.getElementById('phoneForm');
// Asigna los valores a los campos de entrada


let emailGuardado = localStorage.getItem("inputText");
emailInput.value = emailGuardado;



const btn = document.getElementById('submitProfile');

btn.addEventListener("click", () => {

    let perfil = {
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        nombre2: segundoNombre.value,
        apellido2: segundoApellido.value,
        tel: telefono.value
    }

    localStorage.setItem('datosPerfil', perfil);

    console.log(localStorage.getItem("datosPerfil"));

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




