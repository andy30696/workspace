
      <div class="row">
        <div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
          <div class="row container p-0 m-0">
            <div class="col">
              <p class="font-weight-normal text-end my-2">Cant.</p>
            </div>
            <div class="col">
              <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
            </div>
            <div class="col">
              <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
            </div>
            <div class="col-3 p-0">
              <div class="btn-group" role="group">
                <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
                <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
























document.addEventListener("DOMContentLoaded", init);

const filterBtn = document.getElementById("filtrar");
const URL = `https://fakestoreapi.com/products`;
let productsDataGlobal = [];

function init() {
  getAll();
  searchProductEvent();

  filterBtn.addEventListener("click", () => {
    filter(productsDataGlobal);
  });
}

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

async function getAll() {
  const response = await fetch(URL);

  if (!response.ok) throw new Error("No se encontro la pagina");

  const data = await response.json();

  console.log(data);

  showData(data);
  productsDataGlobal = data;
}

function showData(dataArray) {
  const contenedor = document.getElementById("contenedor");

  // se inicializa con una cadena vacia para almacenar el html
  let template = "";

  for (let item of dataArray) {
    // extraemos la info expecifica de cada prenda
    const { title, price, description, image, category } = item;

    template += `
      <div class="col-12 col-sm-6 col-md-4 col-xl-3">
          <div class="card">
              <img class="card-img-top" width="200" src="${image}" height='300'  alt="Card image cap">
              <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <div class="overflow-auto" style="height:120px;">
                <p class="card-text">${description}</p>
              </div>
                <br><p>Categoria: ${category}</p>
                <br> <p>Precio USD: ${price}</p>
                <a href="#" class="btn btn-primary">Comprar</a>
              </div>
          </div>
      </div>
      `;
  }

  return (contenedor.innerHTML = template);
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








Pautas

Te dejamos aquí las pautas para la próxima entrega del proyecto: 
En la barra de navegación superior, agregar en la esquina derecha el nombre del usuario ingresado en la pantalla de inicio de sesión. Para ello deberás hacer uso del almacenamiento local.


Cuando el usuario selecciona una categoría de productos, su identificador es guardado en el almacenamiento local antes de redirigir a productos.html.
Modifica la solicitud realizada en la carga del listado de productos (que hicimos en la entrega anterior) para que utilice ese identificador, en lugar de 101.


Con el listado de productos desplegado:

Aplicar filtros a partir de rango de precio definido.
Agregar las funcionalidades de orden ascendente y descendente en función del precio y descendente en función de la relevancia (tomaremos para ello la cantidad de artículos vendidos)


ATENCIÓN:

Las imágenes proporcionadas en todos los casos son meramente ilustrativas, y están presentes para brindar entendimiento visual sobre cada pauta. No se espera que el resultado cumpla con los mismos criterios de estilo específicos. 
 

 ---

¡Desafiate!
Además de ordenar y filtrar nuestro listado de productos ¿qué te parece si también agregamos un buscador?

Incorpora un campo de texto buscador <input type="search">, que filtre en tiempo real (el evento input te será de ayuda) según el texto que se ingresa en dicho campo.
Incluye en la búsqueda el texto en el título y en la descripción de los artículos.