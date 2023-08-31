
let categoriaID = localStorage.getItem("catID");

const categoriaURL = `https://japceibal.github.io/emercado-api/cats_products/${categoriaID}.json`;

const fichas = document.getElementsByClassName("contenedor")[0];
const titulo = document.getElementById("tituloCategoria");

function crearFichas(registro){

    titulo.innerHTML +=
        `
            <div>
                <h2 class="tituloCategoria"> Venta de ${registro.catName}</h2>
            </div>
        `;
    

    for (const i of registro.products){
        fichas.innerHTML +=
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






