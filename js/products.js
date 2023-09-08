const div = document.getElementById("productos"); // Aquí se obtiene un elemento del DOM con el ID productos.
const storedValue = localStorage.getItem("catID"); // Obtiene el valor almacenado en el Local Storage bajo la clave "catID".
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${storedValue}.json`; // Se construye una URL utilizando el valor almacenado en storedValue.
const container = document.getElementById("productos"); // Se obtiene otro elemento del DOM con el ID productos.

// Botones de filtro
const filterBtn = document.getElementById("filtrar");
const filterAsc = document.getElementById("rangeFilterAsc");
const filterDesc = document.getElementById("rangeFilterDesc");
const filterRelevance = document.getElementById("filterRelevance");

let productsDataGlobal = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch(DATA_URL)
    .then((response) => response.json())
    .then((data) => {
      productsDataGlobal = data.products; // Almacena los datos en la variable global
      showData(productsDataGlobal); // Muestra los datos iniciales
      filterProductEvent(); // Llama a la funcion de la barra de busqueda
    })
    .catch((error) => console.error("Error al obtener los datos:", error));

  filterBtn.addEventListener("click", () => {
    filter(productsDataGlobal); // Usa los datos almacenados en la variable global
  });
});

function setProductID(id) {
  localStorage.setItem("setProduct", id);
  window.location = "product-info.html";
}

function showData(dataArray) {
  container.innerHTML = "";
  for (const item of dataArray) {
    container.innerHTML += `
    <div class="col-12 col-xl-4 col-md-4 col-sm-6">
      <div class="card">
            <img class="card-img-top" width="200" src="${item.image}"alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}
            <br> Precio USD: ${item.cost} 
            <br> Vendidos: ${item.soldCount}</p>
            <hr>
            <a href="#" class="btn btn-primary"> Comprar </a>
            <button class="btn btn-primary masInfo" onclick="setProductID(${item.id})"> Mas Info </button>        
        </div>
      </div>
    </div>
    `; 
  }
}

//funcion para filtrar
function filterPrice(dataArray) {
  const minPrice = document.getElementById("min");
  const maxPrice = document.getElementById("max");

  let min = parseFloat(minPrice.value) || 0;
  let max = parseFloat(maxPrice.value) || Infinity;
  const filteredProducts = dataArray.filter(
    (productos) => productos.cost >= min && productos.cost <= max
  );
  console.log("Filtered Products:", filteredProducts);
  showData(filteredProducts);
}

filterBtn.addEventListener("click", () => {
  filterPrice(productsDataGlobal);
});

filterAsc.addEventListener("click", () => {
  const sortedAsc = productsDataGlobal.slice(0);
  sortedAsc.sort((a, b) => a.cost - b.cost);
  showData(sortedAsc);
});

filterDesc.addEventListener("click", () => {
  const sortedDesc = productsDataGlobal.slice(0);
  sortedDesc.sort((a, b) => b.cost - a.cost);
  showData(sortedDesc);
});

filterRelevance.addEventListener("click", () => {
  const sortedRel = productsDataGlobal.slice(0);
  sortedRel.sort((a, b) => b.soldCount - a.soldCount);
  showData(sortedRel);
});

function filterProductEvent() {
  const buscar = document.getElementById("buscar");

  buscar.addEventListener("input", () => {
    if (buscar.value.length < 1) {
      showData(productsDataGlobal);
      return;
    }

    const filteredData = productsDataGlobal.filter((elem) => {
      const title = elem.name
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

//-------------
const mensajeEmergente = document.getElementById("mensajeEmergente");
const buscar = document.getElementById("buscar");

filterAsc.addEventListener("mouseover", () => {
  mostrarMensaje("Filtrar ascendentemente");
});

filterAsc.addEventListener("mouseout", () => {
  ocultarMensaje();
});

filterDesc.addEventListener("mouseover", () => {
  mostrarMensaje("Filtrar descendentemente");
});

filterDesc.addEventListener("mouseout", () => {
  ocultarMensaje();
});

filterRelevance.addEventListener("mouseover", () => {
  mostrarMensaje("Filtrar por relevancia descendiente");
});

filterRelevance.addEventListener("mouseout", () => {
  ocultarMensaje();
});

buscar.addEventListener("mouseover", () => {
  mostrarMensaje("Buscar por título o descripción");
});

buscar.addEventListener("mouseout", () => {
  ocultarMensaje();
});

function mostrarMensaje(texto) {
  mensajeEmergente.innerText = texto;
  mensajeEmergente.style.display = "block";
}

function ocultarMensaje() {
  mensajeEmergente.style.display = "none";
}
