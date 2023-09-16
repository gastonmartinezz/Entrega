const isLoggedIn = true;
     
if (isLoggedIn) {
  const username = localStorage.getItem("Email");
  const usernameElement = document.getElementById("logged-in-username");
 
  usernameElement.textContent = username;
}



document.addEventListener("DOMContentLoaded", function () {
    
  let productoid = localStorage.getItem('idproduct');
  const CommentURL = `https://japceibal.github.io/emercado-api/products/${productoid}.json`;
  
  fetch(CommentURL)
  .then(response => response.json())
  .then(data => Infoproducto(data))
  
  const Comentarios = `https://japceibal.github.io/emercado-api/products_comments/${productoid}.json`
  fetch(Comentarios)
  .then(response => response.json())
  .then(datos => Comments(datos))

})


const fichas = document.getElementById('main')

function Infoproducto(x){

  fichas.innerHTML =
  `
  
  <div class = "contenidoTexto">
  
  <p class = "categoria">Categoria: ${x.category}</p>
  <h1 class = "titulo"> ${x.name}</h1>
  <p class = "descripcion"> ${x.description}</p>
  <p class = "costo">${x.currency} ${x.cost} </p>
  <div class="seleccion">
  <button class="botoncarrito">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg>  Agregar al carrito</button>
  <input type="number" name="" id="cantidad" placeholder="1" value="1" min="1">
  </div>
          


  <p class = "Vendidos">Cantidad de unidades vendidas: ${x.soldCount}</p>
          
  </div>
          
  <div class="mainImg">
  
  </div>
          
  <div class="carrusel">
    <img id="carrusel0" src=${x.images[0]}>
    <img id="carrusel1" src=${x.images[1]}>
    <img id="carrusel2" src=${x.images[2]}>
    <img id="carrusel3" src=${x.images[3]}>
  </div>
          
  `
  const ImgMain = document.getElementById('MainImagen')
  const Img0 = document.getElementById('carrusel0')
  const Img1 = document.getElementById('carrusel1')
  const Img2 = document.getElementById('carrusel2')
  const Img3 = document.getElementById('carrusel3')

  Img1.addEventListener('click',(e)=>{
    Mainimagen.src = Img1.src
  })

  Img2.addEventListener('click',(e)=>{
    Mainimagen.src = Img2.src
  })

  Img3.addEventListener('click',(e)=>{
    Mainimagen.src = Img3.src
  })

  Img0.addEventListener('click',(e)=>{
    Mainimagen.src = Img0.src
  })

  
  let divComentarios = document.getElementById("divComentarios");
} 


//Funcion escribirComentario: Recibe un registro y escribe un comentario con los datos del registro en el div de id "divComentarios".
function escribirComentario( objeto ){

  divComentarios.innerHTML += `
  <div class="comentario">
    <p class="comNombre">${objeto.user} <div class="comEstrellitas"></div></p>
    <p class="comDescripcion">${objeto.description}</p>
    <p class="comFecha">${objeto.dateTime}</p>
  </div>
`
}

//Al cargar la pagina
document.addEventListener("DOMContentLoaded", function(){

  //Debe haber un elemento en el local storage con el id del producto de la pagina.
  const PRODUCT_ID = localStorage.getItem("productoId");
    
  //URL con el Json de los comentarios del producto.
  const URL_COMMENTS = `https://https://japceibal.github.io/emercado-api/products_comments/${PRODUCT_ID}.json`;
    
  //Fetch al json de comentarios
  fetch(URL_COMMENTS + PRODUCT_ID + ".json")
  .then(response => response.json)
  .then(comments => {
        
    //Vaciar el div con comentarios
    let divComentarios = document.getElementById("divComentarios");
    divComentarios.innerHTML = "";

      //Para cada elemento (comentario) de la lista de comentarios
      for (let i of comments){

        //Escribir un comentario con sus datos
        escribirComentario(i);
      }

    })
  .catch(error => alert(error))


})
