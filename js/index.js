const isLoggedIn = true;
     
if (isLoggedIn) {
    const username = localStorage.getItem("Email");
    const usernameElement = document.getElementById("logged-in-username");
    usernameElement.textContent = username;
} 

const passvalidation = localStorage.getItem('pass');
const mailvalidation = localStorage.getItem('Email');

console.log(mailvalidation);
console.log(passvalidation);

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

    //mostrar alt pfp si noche
    toggleImgNoche();
});


document.getElementById('closeSession').addEventListener('click', function() {
    localStorage.clear();
    alert('Haz cerrado sesion correctamente');
    window.location.href = 'login.html';
    
    event.stopPropagation();
})

if(passvalidation === null || passvalidation === '' ||  mailvalidation === 'undefined' || mailvalidation === null){
    alert('Necesitas inicar sesion');
    window.location.href = 'login.html';
}

//JS Para cambiar imagen si noche
function toggleImgNoche(){
    let modo = localStorage.getItem("modo");
    let imagen = document.getElementsByClassName("jumbotron")[0];
    if (modo == "noche"){
        imagen.classList.add("oscuro");
    } else if (imagen.classList.contains("oscuro")){
        imagen.classList.remove("oscuro");
    }
}