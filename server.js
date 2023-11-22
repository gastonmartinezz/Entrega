const express = require('express');
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});

// Configurar el directorio estático para servir archivos
app.use(express.static(__dirname));

//IMPORTANTE: Que express maneje peticiones en formato json
app.use(express.json());


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
//Funciones pre-definidas:

//CrearToken
function crearToken(user) {
  const payload = {
    mail: user.mail,
    pass: user.pass
  };
  
  const secret = '111';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
}


//Seccion 2, punto 1
app.post("/login", (req, res) => {
  
  let cuerpo = req.body;
  if (!cuerpo)
    res.status(404).send("User login failed");

  //res.send(cuerpo); 
  let token = crearToken(cuerpo);

  res.status(200).json({status: "ok", "res": token});
});


////
//
