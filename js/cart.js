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
  const carritoProductos =
    JSON.parse(localStorage.getItem("carritoProductos")) || [];
  const carrito = document.getElementById("tablebody");


  const subtotalGeneralElement = document.getElementById("costos");

  carritoProductos.forEach((element) => {
    const precioNumero = parseFloat(element.precio);
    if (!isNaN(precioNumero)) {
      // Si el valor es un número válido, suma al subtotal general
      subtotalGeneral += precioNumero;
    }
    subtotalGeneralElement.innerHTML = subtotalGeneral;

  });

  // Muestra los productos en la tabla del carrito
  carritoProductos.forEach((element) => {
    const row = document.createElement("tr");
    console.log(carritoProductos);
    row.innerHTML = `
    <td scope="row"><img src="${element.imagen}" width=100px alt="product"></td>
    <td scope="row">${element.producto}</td>
    <td scope="row">${data.articles[0].currency} ${element.precio}</td>
    <input type="number" id="cantidad" name="cantidad" class="form-control" min="1"
      value="${element.cantidad}" data-unit-cost="${element.precio}" style="width: 4rem";/>
      
  <td scope="row"><span class="subtotal-value">${data.articles[0].currency}${element.precio}</span></td>
      `;
    carrito.appendChild(row);

    carrito.querySelectorAll("input[name='cantidad']").forEach((input) => {
      input.addEventListener("input", () => {
        const cantidadInput = parseInt(input.value, 10);
        const unitCost = parseFloat(input.getAttribute("data-unit-cost"));
        const subtotal = isNaN(cantidadInput) ? 0 : cantidadInput * unitCost;
        const subtotalElement =
          input.parentElement.querySelector(".subtotal-value");
        subtotalElement.innerHTML = `${data.articles[0].currency} ${subtotal}`;

        // Visualizar subtotal general 
        carrito.querySelectorAll(".subtotal").forEach((subtotalElement) => {
          subtotalGeneral += parseFloat(subtotalElement.innerHTML.replace(data.articles[0].currency, ""));
        });

        const subtotalGeneralElement = document.getElementById("costos");
        subtotalGeneralElement.innerHTML = `${data.articles[0].currency} ${subtotalGeneral}`;


      });
    });
  });
}


// Llama a la función para mostrar los productos en el carrito al cargar la página

let productosDatal;

function calcularSubtotal(precio, cantidad) {
  return precio * cantidad;
}

//Entrega 6

function mostrarCostos() { }

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
