

const isLoggedIn = true;
     
if (isLoggedIn) {
       const username = localStorage.getItem("Email");
    const usernameElement = document.getElementById("logged-in-username");
 
    usernameElement.textContent = username;
} 


const passvalidation = localStorage.getItem('pass')
const mailvalidation = localStorage.getItem('Email')

console.log(mailvalidation)
console.log(passvalidation)

document.getElementById('logout').addEventListener('click', function() {
    
    localStorage.clear()
    alert('Haz cerrado sesion correctamente')
    window.location.href = 'login.html'
    
    event.stopPropagation()


})

if(passvalidation === null || passvalidation === '' ||  mailvalidation === 'undefined' || mailvalidation === null){

    alert('Necesitas inicar sesion')
    window.location.href = 'login.html'
}