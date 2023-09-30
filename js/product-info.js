const isLoggedIn = true;
     
if (isLoggedIn) {
  const username = localStorage.getItem("Email");
  const usernameElement = document.getElementById("logged-in-username");
 
  usernameElement.textContent = username;
}

//Defino una lista vacia que contendrá comentarios(objetos)
let listaComentarios = [];

//idProducto
let productoid = localStorage.getItem('idproduct');

document.addEventListener("DOMContentLoaded", function () {
    
  const ProductoURL = `https://japceibal.github.io/emercado-api/products/${productoid}.json`;
  
  //fetch a JSON de productos: llama a funciones de infoproductos como a los relatedproducts
  fetch(ProductoURL)
  .then(response => response.json())
  .then(data => {
    Infoproducto(data);
    cargarProductosRelacionados(data);
  })
  .catch(error => console.log(error));


  //Fetch a JSON de comentarios
  const Comentarios = `https://japceibal.github.io/emercado-api/products_comments/${productoid}.json`
  fetch(Comentarios)
  .then(response => response.json())
  .then(datos => agregarComentariosJSON(datos))
  .catch(error => console.log(error)) 

});

let divComentarios = document.getElementById("comentarios");

//Llamar productos relacionados (dentro de fetch)
function cargarProductosRelacionados(data){
  const relatedProducts = data.relatedProducts;
  const ProductRel = document.getElementById("productos-relacionados-lista");

    
    relatedProducts.forEach(product => {

      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      
    
      productCard.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
      `;
      
    
      productCard.addEventListener('click', () => {
        localStorage.setItem('idproduct',product.id)
        document.location.reload();
      });

      ProductRel.appendChild(productCard);
  })
}

//Agrega los comentarios del JSON a la listaComentarios y muestra la lista
function agregarComentariosJSON(lista){
  for (i of lista){

    const username = i.user;
    const rating = i.score;
    const text = i.description;
    const date = new Date(i.dateTime);
  
    const newComment = {
      "user": username,
      "rating": rating,
      "text": text,
      "date": date
    }
    listaComentarios.push(newComment);
  }
  imprimirComentariosLocal();
}

const fichas = document.getElementById('main')

//Crea el HTML con los datos del producto de la pagina
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
  <a href="products.html">Volver al listado<a>
  <img id="Mainimagen" src=${x.images[0]}>
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

}

const commentsContainer = document.getElementById('divComentarios');
const commentForm = document.getElementById('comment-form');

// Función para mostrar los comentarios
function displayComments(comments) {
  //Vaciar DIV
  commentsContainer.innerHTML = '';

  //Para cada elemento en la lista, anidar un div commentDiv con los datos.
  comments.forEach(comment => {

    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');

    //Escribir datos
    let fecha = new Date(comment.date);
    let date = fecha.toLocaleString();
    commentDiv.innerHTML = `
      <span class="user">${comment.user}</span> - Puntuación: ${'&#9733;'.repeat(comment.rating)} - ${date}<br>
      ${comment.text}
    `;

    //Anidar en commentsContainer
    commentsContainer.appendChild(commentDiv);
  });
}

//Form para crear un nuevo comentario en la pagina y el Local
commentForm.addEventListener('submit', event => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const rating = parseInt(document.getElementById('rating').value);
  const text = document.getElementById('comment').value;
  const date = new Date();

  //Crear Comentario (objeto)
  const newComment = {
    "user": username,
    "rating": rating,
    "text": text,
    "date": date
  };

  //Guardar comentario en lista local
  listaComentarios.push(newComment);

  //Guardar comentario en Local del producto
  saveCommentsLocal(newComment);

  //Mostrar comentario de la lista entera
  displayComments(listaComentarios);

});

//Funcion que guarda un comentario (objeto) en el LocalStorage. 
function saveCommentsLocal(comentario){

  let local = localStorage.getItem(`${productoid}Comentarios`);
  let lista = []
  if (local != null) lista= JSON.parse(local);
  lista.push(comentario);
  localStorage.setItem(`${productoid}Comentarios`, JSON.stringify(lista))
}



//Añade los comentarios del local a la listaComentarios, luego la imprime.
function imprimirComentariosLocal() {
  let local = JSON.parse(localStorage.getItem(`${productoid}Comentarios`));
  if (local != null)
    for ( i of local){
      listaComentarios.push(i);
  }
  displayComments(listaComentarios);
}

