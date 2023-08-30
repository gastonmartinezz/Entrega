
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

/*fetch(categoriaURL)
.then(response => response.json())
.then(data => {(data);

  const precioFiltrosBtn = document.getElementById("precioFiltros");

  precioFiltrosBtn.addEventListener("click", function () {
    const precioMinInput = parseFloat(document.getElementById("precioMin").value);
    const precioMaxInput = parseFloat(document.getElementById("precioMax").value);

   
    const productosFiltradosOrdenados = data.products.filter(producto => {
      const precioProducto = parseFloat(producto.cost);
      return precioProducto >= precioMinInput && precioProducto <= precioMaxInput;
    }).sort((a, b) => {
      const precioA = parseFloat(a.cost);
      const precioB = parseFloat(b.cost);
      return precioA - precioB;
    });

    
    fichas.innerHTML = "";

   
    crearFichas({ catName: data.catName, products: productosFiltradosOrdenados });
  });
});*/

/*fetch(categoriaURL)
.then(response => response.json())
.then(data => {(fichas)
 

  const precioFiltrosBtn = document.getElementById("precioFiltros");

  precioFiltrosBtn.addEventListener("click", function () {
    const precioMinInput = parseFloat(document.getElementById("precioMin").value);
    const precioMaxInput = parseFloat(document.getElementById("precioMax").value);

   
    const productosFiltrados = data.products.filter(producto => {
      const precioProducto = parseFloat(producto.cost);
      return precioProducto >= precioMinInput && precioProducto <= precioMaxInput;
    });

   
    fichas.innerHTML = "";

    
    crearFichas({ catName: data.catName, products: productosFiltrados });
  });
});*/

document.addEventListener("DOMContentLoaded", function () {
  const precioFiltrosBtn = document.getElementById("precioFiltros");

  precioFiltrosBtn.addEventListener("click", function () {
    const precioMinInput = parseFloat(document.getElementById("precioMin").value);
    const precioMaxInput = parseFloat(document.getElementById("precioMax").value);

    fetch(categoriaURL)
      .then(response => response.json())
      .then(data => {
        
        const productosFiltradosOrdenados = data.products.filter(producto => {
          const precioProducto = parseFloat(producto.cost);
          return precioProducto >= precioMinInput && precioProducto <= precioMaxInput;
        }).sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));

        
        fichas.innerHTML = "";

        
        crearFichas({ catName: data.catName, products: productosFiltradosOrdenados });
      });
  });
});

  
 
