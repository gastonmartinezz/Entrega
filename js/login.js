document.getElementById("login").addEventListener("submit", (e) =>{
    e.preventDefault()

     const password = document.getElementById("pswrd").value
     const mail = document.getElementById("email").value

     console.log(password)
     console.log(mail)

    localStorage.setItem("email", mail)
    localStorage.setItem("paswrd", password)

    console.log(localStorage)
    alert("Ingreso con exito")

    window.location.href = "index.html"
})


document.getElementById('formulario').addEventListener('submit', (e) =>{
 
    e.preventDefault()
    const pass = document.getElementById('pass').value
    const mail = document.getElementById('mail').value

    console.log(pass)
    console.log(mail)

    localStorage.setItem('Email', mail);
    localStorage.setItem('pass', pass);

    console.log(localStorage)


    alert('Registrado con éxito!')

    window.location.href = 'index.html'

})



