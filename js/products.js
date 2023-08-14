
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

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