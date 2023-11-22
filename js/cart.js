// const URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const URL = "/emercado-api-main/user_cart/25801.json";
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
  let costoEnvio = 0;
  let subtotal = 0;
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
      <td scope="row"><button class="eliminar-articulo btn btn-danger"><i class="fas fa-trash"></i></button></td>
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
    subtotal = 0;
    numbers.forEach(number => {
      const cantidadInput = number.value;
      const unitCost = parseFloat(number.getAttribute('data-unit-cost'));
      subtotal += cantidadInput * unitCost;
    });
    totalElement.textContent = `Precio: ${data.articles[0].currency} ${subtotal.toFixed(2)}`;

    // actualizarCostoTotal();
    // Calcular el costo de envío
    const costoEnvioElement = document.getElementById("costoEnvio");

    function actualizarCostoEnvio() {
      // costoEnvio = 0;
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

      function actualizarCostoTotal() {
        const costoTotalDiv = document.getElementById("costoTotal");
        let costoTotal = 0;
        costoEnvio = parseFloat(costoEnvio);

        costoTotal = costoEnvio + subtotal;
        costoTotalDiv.textContent = `Precio: ${data.articles[0].currency} ${costoTotal.toFixed(2)}`;


      }

      envioInput.forEach(input => {
        input.addEventListener('input', () => {
          actualizarCostoEnvio();
          actualizarCostoTotal();
        });
      });


      actualizarCostoTotal();
    }

    actualizarCostoEnvio();
    numbers.forEach(number => {
      number.addEventListener('input', () => {
        actualizarSubtotal();
        actualizarCostoTotal();
      });
    });
  }
  actualizarSubtotal();



  // desafiate 
  // Agrega un controlador de eventos para los botones de "Eliminar"
  const eliminarBotones = document.querySelectorAll(".eliminar-articulo");
  eliminarBotones.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      // Obtiene la fila que contiene el botón de "Eliminar"
      const fila = event.target.closest("tr");

      // Obtiene el índice de la fila
      const indice = Array.from(fila.parentNode.children).indexOf(fila);

      // Elimina el artículo del carrito en la posición 'indice'
      carritoProductos.splice(indice, 1);
      localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos));

      // Elimina la fila de la tabla
      fila.remove();

      // Actualiza los totales
      location.reload();
    });
  });


  //--------------------------------
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

//validación de todo el doc
function validarCompra() {
  // Realiza las validaciones
  const envioRadios = document.getElementsByName("envio");
  const direccionCalle = document.getElementById("calle").value.trim();
  const direccionNumero = document.getElementById("numero").value.trim();
  const direccionEsquina = document.getElementById("esquina").value.trim();
  const formaPagoRadios = document.getElementsByName("formasDePago");

  // Verifica que se haya seleccionado un tipo de envío
  let envioSeleccionado = false;
  for (const envioRadio of envioRadios) {
    if (envioRadio.checked) {
      envioSeleccionado = true;
      break;
    }
  }

  if (!envioSeleccionado) {
    alert("Por favor seleccione un tipo de envío.");
    return;
  }

  // Verifica que los campos de dirección estén completos
  if (direccionCalle === "" || direccionNumero === "" || direccionEsquina === "") {
    alert("Por favor complete todos los campos de dirección.");
    return;
  }


  // Verifica que se haya seleccionado una forma de pago
  let formaPagoSeleccionada = false;
  for (const formaPagoRadio of formaPagoRadios) {
    if (formaPagoRadio.checked) {
      formaPagoSeleccionada = true;
      break;
    }
  }

  if (!formaPagoSeleccionada) {
    alert("Por favor seleccione una forma de pago.");
    return;
  }

  // Si todas las validaciones son exitosas, muestra un mensaje de éxito
  alert("La compra se ha realizado con éxito.");
}

// Asocia la función de validación al botón de finalizar compras
const botonFinalizarCompras = document.getElementById('submit');
botonFinalizarCompras.addEventListener('click', validarCompra);




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
