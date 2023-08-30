
let categoriaID = localStorage.getItem("catID");

const categoriaURL = `https://japceibal.github.io/emercado-api/cats_products/${categoriaID}.json`;

const fichas = document.getElementsByClassName("contenedor")[0];
const titulo = document.getElementById("tituloCategoria");

function crearFichas(registro){

    titulo.innerHTML +=
        `
            <div>
                <h2> Venta de ${registro.catName}</h2>
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










