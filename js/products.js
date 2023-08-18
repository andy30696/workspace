const div = document.getElementById("productos"); // Aquí se obtiene un elemento del DOM con el ID productos.

const storedValue = localStorage.getItem("catID"); // Obtiene el valor almacenado en el Local Storage bajo la clave "catID".
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${storedValue}.json`; // Se construye una URL utilizando el valor almacenado en storedValue.

const container = document.getElementById("productos"); // Se obtiene otro elemento del DOM con el ID productos.

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

fetch(DATA_URL)
  .then((response) => response.json())
  .then((data) => showData(data.products))
  .catch((error) => console.error("Error al obtener los datos:", error));

