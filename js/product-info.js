const storedValue = localStorage.getItem("setProduct");
const URL_PRODUCT = `https://japceibal.github.io/emercado-api/products/${storedValue}.json`;
const productDetailsElement = document.getElementById('product-details');


fetch(URL_PRODUCT)
  .then(response => response.json()
  )
  .then(data => {
    console.log(data)
    showProduct(data)
  })
  .catch(error => console.error('Error al obtener información del producto:', error));


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
            <div class="col-12 col-sm-6 col-md-4 my-3">
            <h3><b>Imagenes ilustrativas</b></h3>
                <img src="${img1}" alt="Imagenes representativas de ${name}">
            </div>
            <div class="col-12 col-sm-6 col-md-4 my-3">
                <img src="${img2}" alt="Imagenes representativas de ${name}">
            </div>
            <div class="col-12 col-sm-6 col-md-4 my-3">
                <img src="${img3}" alt="Imagenes representativas de ${name}">
            </div>
            <div class="col-12 col-sm-6 col-md-4 my-3">
                <img src="${img4}" alt="Imagenes representativas de ${name}">
            </div>
         </div>
          
    </div>
    `;
  productDetailsElement.innerHTML = template;
}








