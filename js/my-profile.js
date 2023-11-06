// Obtiene los elementos de los campos de entrada
const emailInput = document.getElementById('perfilEmail');
const nombreInput = document.getElementById('nameForm');
const apellidoInput = document.getElementById('lastNameForm');
const segundoNombre = document.getElementById('secondNameForm');
const segundoApellido = document.getElementById('secondLastNameForm');
const telefono = document.getElementById('phoneForm');
//imagenes
const formFileInput = document.getElementById("formFile");
const imagenPerfil = document.getElementById("imagenPorDefecto");

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
        tel: telefono.value,
        imagenURL: imagenPerfil.src
    }
    const perfilJSON = JSON.stringify(perfil);
    localStorage.setItem('datosPerfil', perfilJSON);

    console.log(localStorage.getItem("datosPerfil"));
    datosVisibles();
});


function datosVisibles() {
    // Recupera la cadena JSON del localStorage
    const perfilJSON = localStorage.getItem('datosPerfil');

    // Convierte la cadena JSON de nuevo a un objeto JavaScript
    const perfilDatos = JSON.parse(perfilJSON);
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
