const URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    showProduct(data);
  })
  .catch((error) => console.error("Error al obtener los datos", error));

function showProduct(data) {
  const tabla = document.getElementById("tablebody");

  data.articles.forEach((element) => {
    /*const cantidadInput = `<input type="number" id="cantidad" name="cantidad" min="1" value="${element.count}" data-unit-cost="${element.unitCost}" />`;*/

    const cantidadInput = `
        <input type="number" id="cantidad" name="cantidad" class="form-control" min="1"
        value="${element.count}" data-unit-cost="${element.unitCost}" style="width: 4rem;/>
        <label class="form-label" for="typeNumber"></label>
    `;

    tabla.innerHTML += `
            <tr>
                <td><img src="${element.image}" width=100px alt="product"></td>
                <td scope="row">${element.name}</td>
                <td scope="row">${element.currency} ${element.unitCost}</td>
                <td scope="row">${cantidadInput}</td>
                <td scope="row"><span class="subtotal">${element.currency} <span class="subtotal-value">${element.unitCost}</span></span></td>

            </tr>
            `;
  });

  // Agregar un evento de escucha al input de cantidad para calcular el subtotal en tiempo real
  tabla.querySelectorAll("input[name='cantidad']").forEach((input) => {
    input.addEventListener("input", () => {
      const cantidad = parseInt(input.value, 10);
      const unitCost = parseFloat(input.getAttribute("data-unit-cost"));
      const subtotal = isNaN(cantidad) ? 0 : cantidad * unitCost;
      const subtotalElement =
        input.parentElement.nextElementSibling.querySelector(".subtotal");
      subtotalElement.innerHTML = `${data.articles[0].currency} ${subtotal}`;
    });
  });
}

/* Envio */

$(document).ready(function () {
  $("#smartwizard").smartWizard({
    selected: 0,
    theme: "arrows",
    autoAdjustHeight: true,
    transitionEffect: "fade",
    showStepURLhash: false,

    lang: {
      next: "Siguiente", // Cambia el texto del botón "Next" a "Siguiente"
      previous: "Anterior", // Cambia el texto del botón "Previous" a "Anterior"
    },
  });
});

/*


function showCarrito() {
  // Obtiene los productos almacenados en localStorage
  const carritoProductos =
  JSON.parse(localStorage.getItem("carritoProductos")) || [];
  
  const carrito = document.getElementById("tablebody");
  
  // Muestra los productos en la tabla del carrito
  carritoProductos.forEach((element) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${element.element}</td>
        <td>${element.unitcost}</td>
        <td>${element.count}</td>
        <td>${element.unitcost * element.count}</td>
      `;
    carrito.appendChild(row);
  });
}

// Llama a la función para mostrar los productos en el carrito al cargar la página
showCarrito();
let productosDatal;

function calcularSubtotal(precio, cantidad) {
  return precio * cantidad;
}


          */



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

