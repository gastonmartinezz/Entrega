
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
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

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  if (localStorage.getItem("modo") == undefined){
    localStorage.setItem("modo", "dia");
    body.classList.toggle('dia') ;
  } else {
    toggle();
  }

});

const btn = document.getElementById('modo');

function toggle() {
  const body = document.body;

  if (body.classList == ""){
    body.classList.add(localStorage.getItem("modo")); 

  } else {
    body.classList.toggle('dia');
    body.classList.toggle('noche');
  }    

  let modoLocal;
  if (body.classList.contains('dia')) {
    modoLocal = "dia";

  } else {
    modoLocal = "noche";
  }

  localStorage.setItem("modo", modoLocal);

  let mode = localStorage.getItem("modo");
  if (mode === "noche") {
      body.classList.add("noche");
  }
}

btn.addEventListener('click', toggle);