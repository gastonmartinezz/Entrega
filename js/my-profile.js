

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

    resetValidationClasses();
    
    if (
        inputPrimerNombre.value.trim() === "" ||
        inputPrimerApellido.value.trim() === "" ||
        inputEmail.value.trim() === "" ||
        inputCelular.value.trim() === ""
      ) {

        setInputInvalid(inputPrimerNombre);
        setInputInvalid(inputPrimerApellido);
        setInputInvalid(inputEmail);
        setInputInvalid(inputCelular);
        return;
      }  else {
        
        setInputValid(inputPrimerNombre);
        setInputValid(inputPrimerApellido);
        setInputValid(inputEmail);
        setInputValid(inputCelular);

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
    }
});

function resetValidationClasses() {
  const inputs = document.querySelectorAll(".form-control");
  inputs.forEach((input) => {
      input.classList.remove("is-invalid", "is-valid");
  });
}

function setInputInvalid(inputElement) {
  inputElement.classList.add("is-invalid");
}

function setInputValid(inputElement) {
  inputElement.classList.add("is-valid");
}





