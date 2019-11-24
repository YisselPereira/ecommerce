const CATEGORIES_URL = "http://127.0.0.1:1994/categorias"
const PUBLISH_PRODUCT_URL = "http://127.0.0.1:1994/publicar";
const CATEGORY_INFO_URL = "http://127.0.0.1:1994/categorias-info";
const PRODUCTS_URL = "http://127.0.0.1:1994/productos";
const PRODUCT_INFO_URL = "http://127.0.0.1:1994/product-info";
const CART_INFO_URL = "http://127.0.0.1:1994/carrito-info";
const CART_BUY_URL = "http://127.0.0.1:1994/carrito-compra";


var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
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
document.addEventListener("DOMContentLoaded", function(e){
  var usuario = localStorage.getItem('usuario');
  document.getElementById("usuario").innerHTML = usuario;
  document.getElementById("cerrar").addEventListener("click",function(){
    localStorage.removeItem("usuario");
  })
})
