const storedValue = localStorage.getItem("catID");
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${storedValue}.json`;

const container = document.getElementById("productos");

function showData(dataArray) {
  for (const item of dataArray) {
    container.innerHTML += `<p> <img src="${item.image}"> 
       <br> ${item.name} 
       <br> ${item.description} 
       <br> ${item.cost} 
       <br> ${item.soldCount}<p>`;
  }
}

fetch(DATA_URL)
  .then((response) => response.json())
  .then((data) => showData(data.products))
  .catch((error) => console.error("Error al obtener los datos:", error));

function showProducts(array) {
  let txtenHTML = "";
  array.forEach((products) => {
    txtenHTML += `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${products.image}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${products.name}</h5>
            <p class="card-text">${products.description}</p>
            <a href="#" class="btn btn-primary">Comprar</a>
        </div>
      </div>`;
  });
  div.innerHTML = txtenHTML;
}
