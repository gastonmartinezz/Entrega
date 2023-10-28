
const isLoggedIn = true;
     
if (isLoggedIn) {
    const username = localStorage.getItem("Email");
    const usernameElement = document.getElementById("logged-in-username");
    usernameElement.textContent = username;
} 

const peugeot = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

// Función para obtener y agregar productos desde la API
async function agregarProductos() {
  try {
    const response = await fetch(peugeot);

    if (!response.ok) {
      throw new Error(`Error al obtener productos desde la API: ${response.status}`);
    }

    const data = await response.json();
    const cartProductsElement = document.getElementById("cartProducts");

    // Limpia la tabla de productos existente
    cartProductsElement.innerHTML = "";
    const id = data.articles[0].id;

    if (data.articles && Array.isArray(data.articles)) {
      // Recorre los artículos y agrégalos a la tabla
      data.articles.forEach(article => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td class="tdImg"><img src="${article.image}" width="50px" alt="Imágen del producto ${article.name}" class="imgCart shadow-md  bg-body-tertiary rounded" ></td>
          <td>${article.name}</td>
          <td><span class="precio-unitario">${article.currency} ${article.unitCost}</span></td>
          <td><input class="cantidad" type="number" value="1" min="1" oninput="actualizarSubtotal(this)" data-id="${id}"></td>
          <td>${article.currency} <span class="subtotal" type="number">${(article.unitCost * article.count)}</span></td>
        `;

        cartProductsElement.appendChild(fila);
      });

    } else {
      console.error();
    }
  } catch (error) {
    console.error(error);
  }
}

//Agregar productos del local
document.addEventListener("DOMContentLoaded",()=>{
  let listaLocal = JSON.parse(localStorage.getItem("carrito"));
  const tablaLocalCarrito = document.getElementById("localProducts");

  listaLocal.forEach((producto) => crearFichaCarrito(producto));
  
  function crearFichaCarrito(producto) {

    let cantidad = producto.cantidad;
    let id = producto.id;
  
    fetch(PRODUCT_INFO_URL + id + ".json")
    .then(response => response.json())
    .then(article => {
      let fila = document.createElement("tr");

      // Verifica si la moneda del artículo es "USD"
      if (article.currency === "USD") {
        // Si la moneda es "USD", el costo y el subtotal ya están en USD
        var costUSD = article.cost;
      } else {
        // Si la moneda es "UYU", realiza la conversión a USD
        var costUSD = article.cost * CONVERSION;
      }
    
      // Calcula el subtotal en USD
      const subtotalUSD = costUSD * cantidad;

      fila.innerHTML =

      
        `<td class="tdImg"><img src="${article.images[0]}" width="50px" alt="Imágen del producto ${article.name}" class="imgCart shadow-md  bg-body-tertiary rounded"></td>
        <td>${article.name}</td>
        <td><span class="precio-unitario">${article.currency} ${article.cost}</span></td>
        <td><input class="cantidad" type="number" value="${cantidad}" min="1" oninput="actualizarSubtotal(this)" data-id="${id}"></td>
        <td>USD <span class="subtotal" type="number">${subtotalUSD.toFixed(2)}</span></td>
        `;
      tablaLocalCarrito.appendChild(fila);
    })
    .catch(error => console.log(error));
  };
});

// Llama a la función para agregar productos desde la API al cargar la página
window.addEventListener("load", agregarProductos);

const CONVERSION = 0.025; // valor según la tasa de conversión actual

function actualizarSubtotal(elemento) {
  const fila = elemento.parentElement.parentElement;
  const unitCosto = fila.querySelector('.precio-unitario');
  const subtotal = fila.querySelector('.subtotal');

  const precioCompleto = unitCosto.textContent;
  const cantidad = parseFloat(elemento.value);

  // Verifica si la moneda es "UYU" y luego realiza la conversión
  if (precioCompleto.includes("UYU")) {
    const unitCost = parseFloat(precioCompleto.match(/[\d.]+/)[0]);
    const unitCostUSD = unitCost * CONVERSION;
    const newSubtotal = unitCostUSD * cantidad;

    // Añade la moneda USD al valor del subtotal
    subtotal.textContent = ` ${newSubtotal.toFixed(2)}`;
  } else {
    // Si la moneda es "USD", simplemente calcula el subtotal en USD
    const unitCostUSD = parseFloat(precioCompleto.match(/[\d.]+/)[0]);
    const newSubtotal = unitCostUSD * cantidad;

    // Añade la moneda USD al valor del subtotal
    subtotal.textContent = ` ${newSubtotal.toFixed(2)}`;
  }

  const id = elemento.getAttribute("data-id");
  const carrito = JSON.parse(localStorage.getItem("carrito"));

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      carrito[i].cantidad = cantidad;
      break;
    }
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* funcion de bootstrap para  chequeo de campos con feedback */
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

$(document).ready(function () {
  $("#tarjetaCheckbox").change(function () {
      if (this.checked) {
          $("#tarjetaFields").show();
      } else {
          $("#tarjetaFields").hide();
      }
  });

  $("#transferenciaCheckbox").change(function () {
      if (this.checked) {
          $("#transferenciaField").show();
      } else {
          $("#transferenciaField").hide();
      }
  });
});