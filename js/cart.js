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
          <td><input class="cantidad" type="number" value="1" min="1" oninput="actualizarSubtotal(this); subtotalEnvioTotal()" data-id="${id}"></td>
          <td>${article.currency} <span class="subtotal" type="number">${(article.unitCost * article.count)}</span></td>
          <td><button class="btn btn-danger" onclick="eliminarProducto(this); subtotalEnvioTotal()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
        </svg></button></td>
        `;

        cartProductsElement.appendChild(fila);
      });

    } else {
      console.error();
    }

    //Actualiza el subtotal cuando se completa el fetch
    subtotalEnvioTotal();

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
        <td><input class="cantidad" type="number" value="${cantidad}" min="1" oninput="actualizarSubtotal(this); subtotalEnvioTotal()" data-id="${id}"></td>
        <td>USD <span class="subtotal" type="number">${subtotalUSD.toFixed(2)}</span></td>
        <td><button class="btn btn-danger" onclick="eliminarProducto(this); subtotalEnvioTotal()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
      </svg></button></td>
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

/////////////////////////////////////////////
//Funcion que actualiza los campos Subtotal, Costo Envio y Total segun lo que esté en la pagina. (NO USA LOCAL STORAGE)
function subtotalEnvioTotal (){

  //Toma los elementos de los subtotales y los guarda en una lista. Itera la lista, sumandolos. Devuelve el subtotal.
  let lista = Array.from(document.querySelectorAll("span.subtotal"));
  let subtotal = 0;
  lista.forEach((element)=> subtotal+= parseFloat(element.innerHTML));

  //console.log(subtotal);

  //Considera el formulario de envio. Calcula el costo de envio.
  let form = document.getElementById("envio").getElementsByTagName("input");
  //console.log(form);
  let costoEnvio = 0;
  for (let i = 0; i < form.length; i++) {
    if(form[i].checked)
      costoEnvio = subtotal * parseFloat(form[i].value);
  }

  //Modificar los elementos en el html
  const DIV_SUBTOTAL = document.getElementById("subtotal");
  const DIV_COSTO_ENVIO = document.getElementById("costo-envio");
  const DIV_TOTAL = document.getElementById("total");

  DIV_SUBTOTAL.textContent= subtotal.toFixed(2);
  DIV_COSTO_ENVIO.textContent= costoEnvio.toFixed(2);
  DIV_TOTAL.textContent= (subtotal + costoEnvio).toFixed(2);
};
/////////////////////////////////////////////

  function eliminarProducto(button) {
  const fila = button.parentElement.parentElement;
  const id = fila.querySelector('.cantidad').getAttribute("data-id");

  // Elimina el producto del carrito
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito = carrito.filter(producto => producto.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Actualizamos la tabla y el subtotal
  fila.remove();
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
        } else {
          validacion();
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated');
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

document.addEventListener("DOMContentLoaded", function () {
  let myModal = new bootstrap.Modal(document.getElementById("myModal"));

  // Agregar un controlador al evento "show.bs.modal" del modal
  myModal._element.addEventListener("show.bs.modal", function () {
    // Validar si al menos una forma de pago está seleccionada
    let tarjetaCheckbox = document.getElementById("tarjetaCheckbox");
    let transferenciaCheckbox = document.getElementById("transferenciaCheckbox");

    if (!tarjetaCheckbox.checked && !transferenciaCheckbox.checked) {
      alert("Por favor, seleccione una forma de pago.");
      myModal.hide();
    }
  });

  // Manejar el guardado de datos
  document.getElementById("guardarCambios").addEventListener("click", function () {
    // Realiza la lógica de guardado aquí

    // Validar campos según la forma de pago seleccionada
    let tarjetaFields = document.getElementById("tarjetaFields");
    let transferenciaField = document.getElementById("transferenciaField");

    if (tarjetaCheckbox.checked) {
      let numeroTarjeta = document.getElementById("numeroTarjeta").value;
      let vencimiento = document.getElementById("vencimiento").value;
      let codigoSeguridad = document.getElementById("codigoSeguridad").value;

      if (!numeroTarjeta || !vencimiento || !codigoSeguridad) {
        alert("Por favor, complete todos los campos de Tarjeta de Crédito.");
        return;
      }
    }

    if (transferenciaCheckbox.checked) {
      let numeroCuenta = document.getElementById("numeroCuenta").value;

      if (!numeroCuenta) {
        alert("Por favor, complete el campo de Número de Cuenta.");
        return;
      }
    }

    // Cierra el modal
    myModal.hide();
  });
});

//Funcionamiento de checkbox de método de pago
const tarjetaCheckbox = document.getElementById("tarjetaCheckbox");
const transferenciaCheckbox = document.getElementById("transferenciaCheckbox");
const tarjetaFields = document.getElementById("tarjetaFields");
const transferenciaField = document.getElementById("transferenciaField");
const formaDePago = document.getElementById("formaDePago");
const texto = document.getElementById("texto");
const numeroCuenta = document.getElementById("numeroCuenta");
const numeroTarjeta = document.getElementById("numeroTarjeta");
const cvv = document.getElementById("codigoSeguridad");
const expired = document.getElementById("vencimiento");
const formulario = document.getElementById('envio');
const alertSuccess = document.getElementById("success");

tarjetaCheckbox.addEventListener("change", function () {
  if (tarjetaCheckbox.checked) {
    transferenciaCheckbox.checked = false;
    tarjetaFields.style.display = "block";
    transferenciaField.style.display = "none";

    texto.textContent = "Tarjeta de Crédito";
    texto.style.color = "black";

  } else {
    tarjetaFields.style.display = "none";
    texto.textContent = "";
  }
});

transferenciaCheckbox.addEventListener("change", function () {
  if (transferenciaCheckbox.checked) {
    tarjetaCheckbox.checked = false;
    transferenciaField.style.display = "block";
    tarjetaFields.style.display = "none";

    texto.textContent = "Transferencia";
    texto.style.color = "black";

  } else {
    transferenciaField.style.display = "none";
    texto.textContent = "";
  }
});

const botonGuardar = document.getElementById("guardarCambios");

botonGuardar.addEventListener("click", () => {
  if (!transferenciaCheckbox.checked && !tarjetaCheckbox.checked) {
    texto.textContent = "Debe seleccionar una forma de pago.";
    texto.style.color = "red";
  }
});

const enviar = document.getElementById("enviarBoton");

function validacion() {
  let tarjetaPago;
  let transferenciaPago;
  if (tarjetaCheckbox.checked && numeroTarjeta.value != "" && cvv.value != "" && expired.value != "") {
    tarjetaPago = true;
  } else {
    tarjetaPago = false;
  }

  if (transferenciaCheckbox.checked && numeroCuenta.value != "") {
    transferenciaPago = true;
  } else {
    transferenciaPago = false;
  }

  if (formulario.classList.contains("was-validated") && (tarjetaPago || transferenciaPago)) {
    alertSuccess.style.display = "block";
  }
};