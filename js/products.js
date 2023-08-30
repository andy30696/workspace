document.addEventListener("DOMContentLoaded", init); // Se ejecuta la funcion init cuando el DOM esta cargado

const div = document.getElementById("productos"); // Aquí se obtiene un elemento del DOM con el ID productos.
const storedValue = localStorage.getItem("catID"); // Obtiene el valor almacenado en el Local Storage bajo la clave "catID".
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${storedValue}.json`; // Se construye una URL utilizando el valor almacenado en storedValue.
const container = document.getElementById("productos"); // Se obtiene otro elemento del DOM con el ID productos.
const filterBtn = document.getElementById("filtrar");
let productsDataGlobal = [];


//init llama a todas las funciones 
function init() {
  getAll();
  searchProductEvent();

  filterBtn.addEventListener("click", () => {
    filter(productsDataGlobal);
  });
}
 
/*fetch(DATA_URL)
  .then((response) => response.json())
  .then((data) => showData(data.products))
  .catch((error) => console.error("Error al obtener los datos:", error));
*/

//Obtiene datos de la URL usando fetch, maneja errores, convierte la respuesta a JSON, muestra y almacena datos
async function getAll() {
  const response = await fetch(DATA_URL);
  if (!response.ok) throw new Error("No se encontro la pagina");

  const data = await response.json();

  console.log(data);

  showData(data.products);
  productsDataGlobal = data;
}

function showData(dataArray) {
  for (const item of dataArray) {
    container.innerHTML += `
    <div class="row card" style="width: 45%">
     <img class="card-img-top" width="200" src="${item.image}"alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">${item.description}
        <br> Precio USD: ${item.cost} 
        <br> Vendidos: ${item.soldCount}</p>
        <a href="#" class="btn btn-primary">Comprar</a>
      </div>
    </div>`;
  }
}



//funcion para filtrar
function filter(dataArray) {
  const minPrice = document.getElementById("min");
  const maxPrice = document.getElementById("max");

  let min = parseFloat(minPrice.value) || 0;
  let max = parseFloat(maxPrice.value) || Infinity;
  const filteredProducts = dataArray.filter(
    (productos) => productos.price >= min && productos.price <= max
  );
  showData(filteredProducts);
}


function searchProductEvent() {
  const buscar = document.getElementById("BUSCAR");

  buscar.addEventListener("input", () => {
    if (buscar.value.length < 1) {
      showData(productsDataGlobal);
      return;
    }

    const filteredData = productsDataGlobal.filter((elem) => {
      const title = elem.title
        .toLowerCase()
        .includes(buscar.value.toLowerCase());
      const descripcion = elem.description
        .toLowerCase()
        .includes(buscar.value.toLowerCase());
      console.log(title);
      console.log(descripcion);
      return title || descripcion;
    });
    console.log(filteredData);
    showData(filteredData);
  });
}