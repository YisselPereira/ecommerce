let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.13;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
  let comissionCostHTML = document.getElementById("comissionText");
  let totalCostHTML = document.getElementById("totalCostText");

  let comissionToShow = Math.round((shippingPercentage * 100)) + "%";
  total = (Math.round(subtotal * shippingPercentage * 100) / 100 + subtotal);

  comissionCostHTML.innerHTML = comissionToShow;
  totalCostHTML.innerHTML = total;
}

function updateSubtotal(){
    let cantidad = document.getElementById("cant").value;
    subtotal = cantidad * productUnitCost;
    document.getElementById("subtotal").innerHTML = subtotal;

}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showArticles(articles){
    let htmlContentToAppend = "";
    let article = articles[0];
    productUnitCost = article.unitCost;
    document.getElementById("productName").innerHTML = article.name;
    document.getElementById("precio").innerHTML = 'Precio unitario $' + article.unitCost;
    document.getElementById("cant").value = article.count;
    document.getElementById("imagen").src = article.src;
    document.getElementById("cantproducto").innerHTML = articles.length;
    updateSubtotal();
    updateTotalCosts();


}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(response){
       if(response.status === "ok"){
           showArticles(response.data.articles);
       } 
    })
    var forms = document.getElementsByClassName('needs-validation')

    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
    document.getElementById("cant").addEventListener("change",function(){
      updateSubtotal();
      updateTotalCosts();
    })
    document.getElementById("goldradio").addEventListener("change", function(){
      shippingPercentage = 0.13;
      updateTotalCosts();
  });
  
  document.getElementById("premiumradio").addEventListener("change", function(){
      shippingPercentage = 0.07;
      updateTotalCosts();
  });

  document.getElementById("standardradio").addEventListener("change", function(){
      shippingPercentage = 0.03;
      updateTotalCosts();
  });
});