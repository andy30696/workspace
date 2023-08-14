
const DATA_URL = ("https:japceibal.github.io/emercado-api/cats_products/101.json")

const container = document.getElementById("productos");

function showData(dataArray) {
    for (const item of dataArray) {
        seriesContainer.innerHTML += `<p> ${item.products_image} <br> ${item.products_name} <br> ${item.products_description} <br> ${item.products.cost} <br> ${item.products.oldCount}<p>`
    }
}
fetch(DATA_URL)
    .then((response) => response.json())
    .then((data) => showData(data.products))
    .catch((error) => console.error("Error al obtener los datos:", error));