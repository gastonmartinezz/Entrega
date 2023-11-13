/* const botonImg = document.getElementById('ruta');
const MainImg = document.getElementById('perfilImg');
const ImputImg = document.getElementById('imagen');


botonImg.addEventListener('click',()=>{
  event.preventDefault(); 
  MainImg.src = ImputImg.value;
  localStorage.setItem("foto", ImputImg.value);
  MainImg.src = localStorage.getItem('foto');
})

document.addEventListener("DOMContentLoaded", () => {
  MainImg.src = localStorage.getItem('foto');
}) */

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
        //email: inputEmail.value.trim(),
        //se modifica el otro campo del local (el del login)
        celular: inputCelular.value.trim(),

      };

      localStorage.setItem("perfilUsuario", JSON.stringify(perfil));
      //Arreglar el Email
      localStorage.setItem("Email", inputEmail.value.trim());
      document.getElementById("logged-in-username").textContent = inputEmail.value;
      /////
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

document.addEventListener('DOMContentLoaded', function () {
  // Obtener elementos del DOM
  const inputFile = document.getElementById('imagen');
  const profileImage = document.getElementById('perfilImg');
  const guardarBtn = document.getElementById('ruta');

  // Función para cargar la imagen desde el almacenamiento local
  function cargarImagen() {
    let fotoGuardada = localStorage.getItem('foto');
    if (fotoGuardada) {
      profileImage.src = fotoGuardada;
      profileImage.style.display = 'block';
    }
  }

  //Cargar Datos del Perfil si existen
  inputEmail.value = localStorage.getItem("Email");

  if (localStorage.getItem("perfilUsuario")){
    let local = JSON.parse(localStorage.getItem("perfilUsuario"));
    inputPrimerNombre.value = local.primerNombre;
    inputSegundoNombre.value = local.sgundoNombre;
    inputPrimerApellido.value = local.pimerApellido;
    inputSegundoApellido.value = local.segundoApellido;
    //inputEmail.value = local.email;
    inputCelular.value = local.celular;
  };

  // Cargar la imagen al iniciar la sesión
  cargarImagen();

  // Escuchar cambios en el input de archivo
  inputFile.addEventListener('change', function (event) {
    // Obtener el archivo seleccionado
    let file = event.target.files[0];

    if (file) {
      // Crear objeto FileReader para leer el contenido del archivo
      let reader = new FileReader();

      // Configurar el evento onload para ser notificado cuando la lectura esté completa
      reader.onload = function (e) {
        // Asignar la URL de la imagen al src del elemento de imagen
        profileImage.src = e.target.result;
        localStorage.setItem('foto', e.target.result);

        // Mostrar la imagen
        profileImage.style.display = 'block';
      };

      // Leer el contenido del archivo como una URL de datos (data URL)
      reader.readAsDataURL(file);
    }
  });

  // Manejar clic en el botón "Guardar imagen"
  guardarBtn.addEventListener('click', function () {
    // Llamada a la función para cargar la imagen desde el almacenamiento local
    cargarImagen();
  });
});