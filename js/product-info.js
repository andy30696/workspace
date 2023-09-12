const storedValue = localStorage.getItem("setProduct");
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
          <div>
          <img src="${img1}" height = "195" alt="Imagenes representativas de ${name}">
          <img src="${img2}" height = "195" alt="Imagenes representativas de ${name}">
          <img src="${img3}" height = "195" alt="Imagenes representativas de ${name}">
          <img src="${img4}" height = "195" alt="Imagenes representativas de ${name}">
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
  
  let data_comentarios = ""

  for (let i = 0; i < data.length; i++) {
    let estrellas = data[i].score;
    console.log("estrellas", estrellas)
    if (estrellas == 0) {
      data_comentarios += `
      <div class="list-group-item"></div>
      <p><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score} 
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span></p>
      <p>${data[i].description}</p>
    </div>`
    } else if (estrellas == 1) {
      data_comentarios += `
        <div class="list-group-item"></div>
          <p><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score} 
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span></p>
          <p>${data[i].description}</p>
        </div>`
    } else if (estrellas == 2) {
      data_comentarios += `
      <div class="list-group-item">
        <p><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score} 
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span></p>
        <p>${data[i].description}</p>
      </div>`

    } else if (estrellas == 3) {
      data_comentarios += `
      <div class="list-group-item">
        <p><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score} 
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span></p>
        <p>${data[i].description}</p>
      </div>`

    } else if (estrellas == 4) {
      data_comentarios += `
      <div class="list-group-item"></div>
        <p><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score} 
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span></p>
        <p>${data[i].description}</p>
      </div>`

    } else if (estrellas == 5) {
      data_comentarios += `
      <div class="list-group-item">
        <p><strong>${data[i].user}</strong> - ${data[i].dateTime} - ${data[i].score} 
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span></p>
        <pp>${data[i].description}</pp>
      </div>`
    }

  }
  document.getElementById("comentarios").innerHTML = data_comentarios;

}








