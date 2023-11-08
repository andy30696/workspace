// Obtiene los elementos de los campos de entrada
const emailInput = document.getElementById('perfilEmail');
const nombreInput = document.getElementById('nameForm');
const apellidoInput = document.getElementById('lastNameForm');
const segundoNombre = document.getElementById('secondNameForm');
const segundoApellido = document.getElementById('secondLastNameForm');
const telefono = document.getElementById('phoneForm');

//imagen de Perfil
const formFileInput = document.getElementById("formFile");
const imagenPerfil = document.getElementById("imagenPorDefecto");

// Guarda el email en el localstorage y lo muestra en su respectivo input
let emailGuardado = localStorage.getItem("inputText");
emailInput.value = emailGuardado;

const btn = document.getElementById('submitProfile');
btn.addEventListener("click", () => {
    // Guarda los datos ingresados en el objeto perfil
    let perfil = {
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        nombre2: segundoNombre.value,
        apellido2: segundoApellido.value,
        tel: telefono.value,
        imagenURL: imagenPerfil.src
    }
    // Convierte el objeto perfil a formato JSON y lo guarda en la variable perfilJSON
    const perfilJSON = JSON.stringify(perfil);

    // Se guarda el objeto en el local storage
    localStorage.setItem('datosPerfil', perfilJSON);

    console.log(localStorage.getItem("datosPerfil"));
    datosVisibles();
});

function datosVisibles() {
    // Recupera la cadena JSON del localStorage
    const perfilJSON = localStorage.getItem('datosPerfil');

    // Convierte la cadena JSON de nuevo a un objeto JavaScript
    const perfilDatos = JSON.parse(perfilJSON);

    // Muestra los datos guardados en el storage, en sus respectivos inputs
    nombreInput.value = perfilDatos.nombre;
    apellidoInput.value = perfilDatos.apellido;
    segundoNombre.value = perfilDatos.nombre2;
    segundoApellido.value = perfilDatos.apellido2;
    telefono.value = perfilDatos.tel;
    imagenPerfil.src = perfilDatos.imagenURL;
}

datosVisibles();

// Cuando se selecciona un archivo, muestra la imagen de perfil
formFileInput.addEventListener("change", function () {
    const file = formFileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagenPerfil.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
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
