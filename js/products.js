
const fichas = document.getElementsByClassName("contenedor")[0];

function crearFichas(registro){
    for (const i of registro){
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


const autosURL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

fetch(autosURL)
.then(response => response.json())
.then(data => crearFichas(data.products));

