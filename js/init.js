 //const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const CATEGORIES_URL = "http://localhost:3000/emercado-api-main/cats/:filename";

// const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/emercado-api-main/sell/:filename"

// const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCTS_URL =  "http://localhost:3000/emercado-api-main/cats_products/:filename"

// const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_URL =  "http://localhost:3000/emercado-api-main/products/:filename";

// const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/emercado-api-main/products_comments/:filename";

// const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_INFO_URL = "http://localhost:3000/emercado-api-main/user_cart/25801.json";

//const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const CART_BUY_URL = "http://localhost:3000/emercado-api-main/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}