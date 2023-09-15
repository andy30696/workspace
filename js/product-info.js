const storedValue = localStorage.getItem("setProduct");
const storedValueUsuario = localStorage.getItem("inputText");
const URL_PRODUCT = `https://japceibal.github.io/emercado-api/products/${storedValue}.json`;
const URL_COMENTARIOS = `https://japceibal.github.io/emercado-api/products_comments/${storedValue}.json`;
const productDetailsElement = document.getElementById('product-details');


fetch(URL_PRODUCT)
  .then(response => response.json()
  )
  .then(data => {
    console.log(data);
    showProduct(data);
  })
  .catch(error => console.error('Error al obtener información del producto:', error));

/*---------------------------------Productos-----------------------------------------*/

function showProduct(dataObj) {
  console.log(dataObj)
  const { category, cost, currency, description, name, images, soldCount } = dataObj;
  const [img1, img2, img3, img4] = images;

  let template = `
    <div id="contProduct" class="col-12">
  
          <div class="row">
            <div class="col-12 text-center">
              <h1>${name}</h1>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <h3><b>Precio</b></h3>
              <p>${currency} ${cost}</p>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <h3><b>Descripcion</b></h3>
              <p>${description}</p>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <h3><b>Categoria</b></h3>
              <p>${category}</p>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <h3><b>Cantidad de vendidos</b></h3>
              <p>${soldCount}</p>
            </div>
          </div>
                    
          <div class="row">
          <div class="slider">
          <swiper-container class="mySwiper" navigation="true">
          <swiper-slide><img src="${img1}" height = "195" alt="Imagenes representativas de ${name}"></swiper-slide>
          <swiper-slide><img src="${img2}" height = "195" alt="Imagenes representativas de ${name}"></swiper-slide>
          <swiper-slide><img src="${img3}" height = "195" alt="Imagenes representativas de ${name}"></swiper-slide>
          <swiper-slide><img src="${img4}" height = "195" alt="Imagenes representativas de ${name}"></swiper-slide>
          </swiper-container>
          </div>
         </div>
          
    </div>
    `;
  productDetailsElement.innerHTML = template;
}

/*-------------------------COMENTARIOS----------------------------------- */
fetch(URL_COMENTARIOS)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    print_comentarios(data);
  })
  .catch(error => console.error('Error al obtener información del producto:', error));


function print_comentarios(data) {

  let data_comentarios = ""; // se crea un contenedor vacio para almacenar los datos de los comentarios.

  for (let i = 0; i < data.length; i++) { // Se utiliza un bucle for para recorrer cada elemento en el array data que contiene los datos de los comentarios. 
    let estrellas = data[i].score; // Se obtiene la calificación del comentario actual y se almacena en la variable estrellas.
    console.log("estrellas", estrellas)

    if (estrellas == 1) { // se agraga una tarjeta al contenedor con los datos de la descripcion, usuario, hora y la calificacion.
      data_comentarios += ` 
      <div class="card mb-4">
      <div class="card-body">
        <p>${data[i].description}</p>
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <p class="small mb-0 ms-2"><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score} </p>
          </div>
          <div class="d-flex flex-row align-items-center">
            <p><span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span></p>
          </div>
        </div>
      </div>
    </div>`
    } else if (estrellas == 2) {
      data_comentarios += `
      <div class="card mb-4">
          <div class="card-body">
            <p>${data[i].description}</p>
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <p class="small mb-0 ms-2"><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score} </p>
              </div>
              <div class="d-flex flex-row align-items-center">
                <p><span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span></p>
              </div>
            </div>
          </div>
        </div>`

    } else if (estrellas == 3) {
      data_comentarios += `
      <div class="card mb-4">
          <div class="card-body">
            <p>${data[i].description}</p>
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <p class="small mb-0 ms-2"><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score} </p>
              </div>
              <div class="d-flex flex-row align-items-center">
                <p><span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span></p>
              </div>
            </div>
          </div>
        </div>`

    } else if (estrellas == 4) {
      data_comentarios += `
      <div class="card mb-4">
          <div class="card-body">
            <p>${data[i].description}</p>
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <p class="small mb-0 ms-2"><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score} </p>
              </div>
              <div class="d-flex flex-row align-items-center">
                <p><span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span></p>
              </div>
            </div>
          </div>
        </div>`

    } else if (estrellas == 5) {
      data_comentarios += `
      <div class="card mb-4">
          <div class="card-body">
            <p>${data[i].description}</p>
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <p class="small mb-0 ms-2"><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score} </p>
              </div>
              <div class="d-flex flex-row align-items-center">
                <p><span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span></p>
              </div>
            </div>
          </div>
        </div>`
    }

  }
  document.getElementById("comentarios").innerHTML = data_comentarios;

}

////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const btnComment = document.getElementById("submit");
  btnComment.addEventListener("click", () => {

    const inputEstrellas = document.getElementById("stars").value;
    const inputComment = document.getElementById("addComment").value;
    console.log("hola");


    const newComment = {
      user: storedValueUsuario,
      description: inputComment,
      dateTime: new Date().toLocaleString(),
      score: inputEstrellas
    };

    console.log(newComment);

    agregarComentario(newComment);
    document.getElementById("addComment").value = "";
    document.getElementById("stars").value = 3;

  });

});

function agregarComentario(newComment) {
  console.log("agregar comentario");

  let data_comentarios = document.getElementById("comentarios").innerHTML;
  data_comentarios += `
  <div class="card mb-4">
    <div class="card-body">
      <p>${newComment.description}</p>
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <p class="small mb-0 ms-2"><strong>${newComment.user}</strong> - ${newComment.dateTime} - ${newComment.score}</p>
        </div>
        <div class="d-flex flex-row align-items-center">
          ${getStarIcons(newComment.score)}
        </div>
      </div>
    </div>
  </div>
  `;

  document.getElementById("comentarios").innerHTML = data_comentarios;

}

function getStarIcons(score) {
  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    const starClass = i <= score ? "fa fa-star checked" : "fa fa-star";
    starIcons.push(`<span class="${starClass}"></span>`);
  }
  return starIcons.join("");
}



