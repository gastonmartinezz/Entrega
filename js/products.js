const isLoggedIn = true;
     
if (isLoggedIn) {
       const username = localStorage.getItem("Email");
    const usernameElement = document.getElementById("logged-in-username");
 
    usernameElement.textContent = username;
} 




    let categoriaID = localStorage.getItem("catID");

const categoriaURL = `https://japceibal.github.io/emercado-api/cats_products/${categoriaID}.json`;

const fichas = document.getElementsByClassName("contenedor")[0];
const titulo = document.getElementById("tituloCategoria");

function crearFichas(registro){

    titulo.innerHTML =
        `
            <div>
                <h2> Venta de ${registro.catName}</h2>
            </div>
        `;
    

    for (const i of registro.products){
        fichas.innerHTML =
            `
            
            <div class="articulo">
                <div class="imagenDeArticulo">
                    <img src= ${i.image}></img>
                </div>
                <div class="descDeArticulo">
                    <p class="titulo"> ${i.name} </p>
                    <p class="dinero"> ${i.currency} ${i.cost} </p>
                    <p class ="descripcion"> ${i.description} </p>
                    <p class ="sold"> Unidades vendidas: ${i.soldCount}</p>
                    <button class="botonDeAgregar">Agregar a Carrito</button>
                </div>
            <div>
            `
    }
};

fetch(categoriaURL)
.then(response => response.json())
.then(data => crearFichas(data));   

console.log(categoriaURL)




async function fetchProductos() {
  const response = await fetch(categoriaURL);
  const data = await response.json();
  return data;
}

async function mostrarProductos(orden) {
  const listaProductos = document.getElementById('contenedor1');
  listaProductos.innerHTML = '';

  const productos = await fetchProductos();

  if (orden === 'asc') {
    productos.products.sort((a, b) => a.cost - b.cost);
  } else if (orden === 'des') {
    productos.products.sort((a, b) => b.cost - a.cost);
  } else if (orden === 'rel'){
    productos.products.sort((a, b) => b.soldCount - a.soldCount )
  }
  crearFichas(productos); 
}
  
  
  /*productos.products.forEach(producto => {
    const li = document.createElement('li');
    li.textContent = `${producto.name} - precio: ${producto.cost}`;
    listaProductos.appendChild(li);
  });
}
*/

function filtrarProductos() {
  const ordenSelect = document.getElementById('ordenSelect');
  console.log(ordenSelect.value)
  mostrarProductos(ordenSelect.value);
   
}

console.log(categoriaURL)

document.addEventListener('keyup', e => {
    if (e.target.matches('#buscador')) {
        const searchText = e.target.value.toLowerCase();
        const elementosTitulo = document.querySelectorAll('.titulo');

        elementosTitulo.forEach(producto => {
            const titulo = producto.textContent.toLowerCase();
            const elementoPadre = producto.closest('.articulo');

            if (titulo.includes(searchText)) {
                // Muestra el elemento si coincide con la búsqueda
                elementoPadre.style.display = 'block';
            } else {
                // Oculta el elemento si no coincide con la búsqueda
                elementoPadre.style.display = 'none';
            }
        });
    }
});

<<<<<<< Updated upstream
=======

/* STICKY (testing) */

// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickying()};
//window.addEventListener("scroll", function(){

/* //Añadir sticky dependiendo del tamaño
window.resize(function() {
 */
    // Get the navbar
    let elemento = document.getElementsByClassName("posibleSticky")[0];

    // Get the offset position of the navbar
    var sticky = elemento.offsetTop;
/* 
    if (window.innerWidth <= 992){
        document.getElementsByTagName("aside")[0].classList.remove("posibleSticky");
        document.getElementsByClassName("barraBusqueda")[0].classList.add("posibleSticky");
    } else {
        document.getElementsByTagName("aside")[0].classList.add("posibleSticky");
        document.getElementsByClassName("barraBusqueda")[0].classList.remove("posibleSticky");
    } */
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
/*     
}); */
function stickying() {
    if (window.scrollY >= sticky) {
      elemento.classList.add("sticky")
    } else {
      elemento.classList.remove("sticky");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const precioFiltrosBtn = document.getElementById("precioFiltros");
      //Aquí estamos seleccionando el botón de filtrado con el id "precioFiltros" y añadiendo un evento de clic. El bloque de código dentro de esta función se ejecutará cuando el usuario haga clic en ese botón.
  
    precioFiltrosBtn.addEventListener("click", function () {
      const precioMinInput = parseFloat(document.getElementById("precioMin").value);
      const precioMaxInput = parseFloat(document.getElementById("precioMax").value);
        // Filtra y ordena los productos según el rango de precios
  
      fetch(categoriaURL)
        .then(response => response.json())
        .then(data => {
            //utilizamos fetch para cargar los datos del JSON
  
          const productosFiltradosOrdenados = data.products.filter(producto => {
            const precioProducto = parseFloat(producto.cost);
            return precioProducto >= precioMinInput && precioProducto <= precioMaxInput;
          }).sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
  
          // Limpiamos el contenedor de productos existente
          fichas.innerHTML = "";
  
          // Creamos las fichas de los productos filtrados y ordenados
          crearFichas({ catName: data.catName, products: productosFiltradosOrdenados });
        });
    });
  });

  async function fetchProductos() {
    const response = await fetch(categoriaURL);
    const data = await response.json();
    return data;
  }
  
  async function mostrarProductos(orden) {
    const listaProductos = document.getElementById('contenedor1');
    listaProductos.innerHTML = '';
  
    const productos = await fetchProductos();
  
    if (orden === 'asc') {
      productos.products.sort((a, b) => a.cost - b.cost);
    } else if (orden === 'des') {
      productos.products.sort((a, b) => b.cost - a.cost);
    } else if (orden === 'rel'){
      productos.products.sort((a, b) => b.soldCount - a.soldCount )
    }
    crearFichas(productos); 
  }

  function filtrarProductos() {
    const ordenSelect = document.getElementById('ordenSelect');
    console.log(ordenSelect.value)
    mostrarProductos(ordenSelect.value);
  }
>>>>>>> Stashed changes
