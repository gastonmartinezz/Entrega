const express = require('express');

const app = express();
const port = 3000;

// Configurar el directorio estático para servir archivos
app.use(express.static(__dirname));

//Seccion 2, punto 1
app.post("/login.html", (req, res) => {

});

///////////////////////////
//Mover todos los "Fetches" al servidor

app.get("/json/categorias", (req,res) =>{
  const DATOS_CATS = require ("./json/cats/cat.json")
  res.json(DATOS_CATS);
});

app.get("/json/producto/:producto", (req,res) =>{
  let numero = req.params.producto;
  let dato = require (`./json/products/${numero}.json`);
  res.json(dato);
});

app.get("/json/categorias/:categoria", (req,res) =>{
  let numero = req.params.categoria;
  let dato = require (`./json/cats_products/${numero}.json`);
  res.json(dato);
});

app.get("/json/comentarios/:comentario", (req,res) =>{
  let numero = req.params.comentario;
  let dato = require (`./json/products_comments/${numero}.json`);
  res.json(dato);
});

app.get("/json/carrito", (req,res) =>{
  let dato = require (`./json/user_cart/25801.json`);
  res.json(dato);
});

app.get("/json/alerta", (req,res) =>{
  let dato = require (`./json/cart/buy.json`);
  res.json(dato);
})

/////////////////////////

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});