//Damos valor verdadero a la constante "isLoggedIn" 

const isLoggedIn = true;
     
//Transformamos el email ingresado en la variable "username" para que figure en pantalla en el costado del navBar.

if (isLoggedIn) {
       const username = localStorage.getItem("Email");
    const usernameElement = document.getElementById("logged-in-username");
 
    usernameElement.textContent = username;
} 