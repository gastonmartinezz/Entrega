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

