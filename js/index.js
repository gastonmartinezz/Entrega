//Damos valor verdadero a la constante "isLoggedIn" 

const isLoggedIn = true;
     
//Transformamos el email ingresado en la variable "username" para que figure en pantalla en el costado del navBar.

if (isLoggedIn) {
    const username = localStorage.getItem("Email");
    const usernameElement = document.getElementById("logged-in-username");
    usernameElement.textContent = username;
} 

//Guardamos los valores de email y password en el localStorage

const passvalidation = localStorage.getItem('pass');
const mailvalidation = localStorage.getItem('Email');

console.log(mailvalidation);
console.log(passvalidation);

//Función para redirigir a la página escogida y lo guarda en el localStorage por ID

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//Función que limpia el localStorage y redirige a la pantalla del login 

document.getElementById('closeSession').addEventListener('click', function() {
    localStorage.clear();
    alert('Haz cerrado sesion correctamente');
    window.location.href = 'login.html';
    
    event.stopPropagation();
})

//Condicional que prueba si los campos estan vacios y dar alerta en caso de que esten vacios

if(passvalidation === null || passvalidation === '' ||  mailvalidation === 'undefined' || mailvalidation === null){
    alert('Necesitas inicar sesion');
    window.location.href = 'login.html';
}