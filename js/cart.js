const URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let subtotalGeneral = 0;

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    showCarrito(data);

  })
  .catch((error) => console.error("Error al obtener los datos", error));
// ----------------------------------------------------------------------------------------


function showCarrito(data) {
  console.log("Entra a showCarrito");

  // Obtiene los productos almacenados en localStorage
  const carritoProductos = JSON.parse(localStorage.getItem("carritoProductos")) || [];
  const carrito = document.getElementById("tablebody");

  // Muestra los productos en la tabla del carrito
  carritoProductos.forEach((element) => {
    const row = document.createElement("tr");
    console.log(carritoProductos);

    row.innerHTML = `
      <td scope="row"><img src="${element.imagen}" width=100px alt="product"></td>
      <td scope="row">${element.producto}</td>
      <td scope="row">${data.articles[0].currency} ${element.precio}</td>
      <input type="number" id="cantidad" name="cantidad" class="form-control seleccionar" min="1"
        value="${element.cantidad}" data-unit-cost="${element.precio}" style="width: 4rem";/>
      <td scope="row"><span class="subtotal-value">${data.articles[0].currency}${element.precio}</span></td>
    `;

    carrito.appendChild(row);

    carrito.querySelectorAll("input[name='cantidad']").forEach((input) => {
      input.addEventListener("input", () => {
        const cantidadInput = parseInt(input.value, 10);
        const unitCost = parseFloat(input.getAttribute("data-unit-cost"));
        const subtotal = isNaN(cantidadInput) ? 0 : cantidadInput * unitCost;
        const subtotalElement = input.parentElement.querySelector(".subtotal-value");
        subtotalElement.innerHTML = `${data.articles[0].currency} ${subtotal}`;
      });
    });
  });

  // Obtén una referencia a los elementos relevantes
  const numbers = document.querySelectorAll('.seleccionar');
  const totalElement = document.getElementById('costos');
  const envioInput = document.querySelectorAll("input[name='envio']");

  // Función para actualizar el sub-total
  function actualizarSubtotal() {
    let subtotal = 0;
    numbers.forEach(number => {
      const cantidadInput = number.value;
      const unitCost = parseFloat(number.getAttribute('data-unit-cost'));
      subtotal += cantidadInput * unitCost;
    });
    totalElement.textContent = `Precio: ${data.articles[0].currency} ${subtotal.toFixed(2)}`;

    // actualizarCostoTotal();
    // Calcular el costo de envío
    const costoEnvioElement = document.getElementById("costoEnvio");

    // let costoEnvio = 0;

    function actualizarCostoEnvio() {

      const envioSeleccionado = document.querySelector("input[name='envio']:checked");
      if (envioSeleccionado) {
        const envioTipo = envioSeleccionado.value;
        if (envioTipo === 'premium') {
          costoEnvio = subtotal * 0.15;
        } else if (envioTipo === 'express') {
          costoEnvio = subtotal * 0.07;
        } else if (envioTipo === 'standard') {
          costoEnvio = subtotal * 0.05;
        }
      }
      costoEnvioElement.textContent = `Precio: ${data.articles[0].currency} ${costoEnvio.toFixed(2)}`;

      //actualizarCostoTotal();
    }

    function actualizarCostoTotal() {
      const costoTotalDiv = document.getElementById("costoTotal");
      let costoTotal = 0;
      //costoTotal = parseFloat(costoEnvioDiv.textContent);
      costoEnvio = parseFloat(costoEnvio);

      console.log("costoEnvio dentro de actualizarCostoTotal: " + costoEnvio);
      console.log("subtotal dentro de actualizarCostoTotal: " + subtotal);

      costoTotal = costoEnvio + subtotal;
      costoTotalDiv.textContent = `Precio: ${data.articles[0].currency} ${costoTotal.toFixed(2)}`;

    }

    // Agrega escuchadores de eventos a los number para detectar cambios

  }
  numbers.forEach(number => {
    number.addEventListener('input', () => {
      actualizarSubtotal();
      actualizarCostoTotal();
    });
  });

  envioInput.forEach(input => {
    input.addEventListener('input', () => {
      actualizarCostoEnvio();
      actualizarCostoTotal();
    });
  });
  // Inicializa el sub-total
  // actualizarSubtotal();
  // actualizarCostoEnvio();
  // actualizarCostoTotal();
}







// Mostrar el tipo de pago seleccionado del modal

const metodoPagoLabel = document.getElementById('infoDelModal');

function actualizarMetodoPagoLabel() {
  if (creditoButton.checked) {
    metodoPagoLabel.innerHTML = "Tarjeta de crédito";
  } else if (bancariaRadio.checked) {
    metodoPagoLabel.innerHTML = "Transferencia bancaria";
  } else {
    metodoPagoLabel.innerHTML = "No ha sido seleccionado";
  }
}


//modal-----------------------------------

const creditoButton = document.getElementById('credito');
var numTarjetaInput = document.querySelector("input[name='numTarjeta']");
var nomTarjetaInput = document.querySelector("input[name='nomTarjeta']");
var vencimientoInput = document.querySelector("input[name='vencimiento']");
var cuentaInput = document.querySelector("input[name='cuenta']");


creditoButton.addEventListener("change", () => {

  if (creditoButton.checked) {
    numTarjetaInput.disabled = false;
    nomTarjetaInput.disabled = false;
    vencimientoInput.disabled = false;
    cuentaInput.disabled = true; // Deshabilitar la cuenta bancaria
  }

  actualizarMetodoPagoLabel()

});

var bancariaRadio = document.getElementById("bancaria");
bancariaRadio.addEventListener("change", function () {
  if (bancariaRadio.checked) {
    numTarjetaInput.disabled = true;
    nomTarjetaInput.disabled = true;
    vencimientoInput.disabled = true;
    cuentaInput.disabled = false; // Habilitar la cuenta bancaria
  }

  actualizarMetodoPagoLabel();
});




//validaciones


// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()




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
