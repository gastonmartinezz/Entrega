

const isLoggedIn = true;
     
if (isLoggedIn) {
       const username = localStorage.getItem("Email");
    const usernameElement = document.getElementById("logged-in-username");
 
    usernameElement.textContent = username;
} 

const botonImg = document.getElementById('ruta');
const MainImg = document.getElementById('perfilImg');
const ImputImg = document.getElementById('imagen');


botonImg.addEventListener('click',()=>{

    MainImg.src = ImputImg.value;
    console.log(ImputImg.value)

})

const botonGuardar = document.getElementById("mandar");
const inputPrimerNombre = document.getElementById("primer-nombre");
const inputPrimerApellido = document.getElementById("primer-apellido");
const inputEmail = document.getElementById("email");
const inputSegundoNombre = document.getElementById("segundo-nombre");
const inputSegundoApellido = document.getElementById("segundo-apellido");
const inputCelular = document.getElementById("celular");

botonGuardar.addEventListener("click", function(event){
    event.preventDefault();

    if (
        inputPrimerNombre.value.trim() === "" ||
        inputPrimerApellido.value.trim() === "" ||
        inputEmail.value.trim() === "" ||
        inputCelular.value.trim() === ""
      ) {
        alert("Por favor, complete los campos obligatorios");
        return;
      }

      const perfil = {
        primerNombre: inputPrimerNombre.value.trim(),
        sgundoNombre: inputSegundoNombre.value.trim(),
        pimerApellido: inputPrimerApellido.value.trim(),
        segundoApellido: inputSegundoApellido.value.trim(),
        email: inputEmail.value.trim(),
        celular: inputCelular.value.trim(),

      };

      localStorage.setItem("perfilUsuario", JSON.stringify(perfil));
      alert("Datos guardados con exito")
});






