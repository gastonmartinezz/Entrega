const express = require('express');
const jwt = require("jsonwebtoken");
const fs = require("fs");
const secret = '123';
const bodyParser = require("body-parser");

//mariadb
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: 'localhost',
  user:'root', 
  password: '2307',
  database:'entrega'
});

const app = express();
const port = 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});

app.use(bodyParser.json());

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

//Funcion para CrearToken con 1h de expiracion
/* function crearToken(user) {
  const payload = {
    mail: user.mail,
    pass: user.pass
  };
  
  const secret = '123';
  const options = { expiresIn: '1h' };

  TOKEN = jwt.sign(payload, secret, options)
  return TOKEN;
}
*/

//Seccion 2, punto 1
//POST. Crea un token y lo devuelve como json
app.post("/login", (req, res) => {
  const mail = req.body.mail;
  const pass = req.body.pass;

  if (mail && pass) {
    const token = jwt.sign({mail}, secret, {expiresIn: "1h"});
    console.log("Token generado:", token);
    //res.cookie("access-token", token, {httpOnly: true, secure: true});
    res.status(200).json({token});
  } else {
    res.status(401).json({message: "Usuario no encontrado"});
  }
  
  /* let cuerpo = req.body;
  if (!cuerpo)
    res.status(404).send("User login failed");

  //res.send(cuerpo); 
  let token = crearToken(cuerpo);
  res.status(200).json({"token": token}); */
});

// Middleware de autorización para la ruta /cart /COOKIE/
/* const authorizarMiddleware = (req, res, next) => {
  const tokenWitCookie = req.headers['cookie'];
  const token = tokenWitCookie.replace('access-token=', '');

  if (!token) {
    return res.status(401).json({ message: "Accesso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log("accesso correcto");
    console.log(decoded);
    next();
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return res.status(401).json({ message: "Accesso denegado. Token incorrecto." });
  }
}; */

//v2 /SOLO JWT/
function verificarToken(req, res, next){
  
  let tokenEntrada = req.body.token;
  if (tokenEntrada){

    jwt.verify(tokenEntrada, secret, (err, decoded) =>{
      if (err){
        console.log("Token invalido");
        res.sendStatus(420).json({message: "Token Invalido"});
      } else {
        console.log("Token Valido: ", decoded);
        next();
      }
    })
  } else {
    console.log("No se mando un token");
    res.status(404).json({message: "Todo mal"});
  }
}

// Aplicar el middleware de autorización solo para la ruta /cart

app.get("/cart", (req, res) => {
  res.sendFile(__dirname + '/cart.html');
});

//app.use("/cart", authorizarMiddleware);

//un post que se hace en carrito y deberia validar el token del usuario
app.post("/cart", verificarToken, async (req,res)=>{
  res.json( {message: "BIENN"});

  let conn;
  try {
    let carrito = localStorage.getItem("carrito");
    req.body = carrito;

    if (!id || !cant) {
      return res.status(400).json({ message: "Los datos no son válidos." });
    }

    const conn = await pool.getConnection();

    const response = await conn.query(
      "INSERT INTO carrito(id, cant) VALUES (?, ?)",
      [req.body[0].id, req.body[0].cantidad]
    );
    //res.json({id: parseInt(response.insertId), ...req.body});
        
  } catch(error) {
    res.status(500).json({message: "El servidor se rompió."})
  }finally {
    if (conn) conn.release();
  }
})
