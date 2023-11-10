

const isLoggedIn = true;
     
if (isLoggedIn) {
       const username = localStorage.getItem("Email");
    const usernameElement = document.getElementById("logged-in-username");
 
    usernameElement.textContent = username;
} 

const botonImg = document.getElementById('ruta');
const MainImg = document.getElementById('perfilImg');
const ImputImg = document.getElementById('imagen');
//iMput..

//Hacer un DOMContentLoaded donde: Si existe una img en el localStorage, mostrarla. Sino, mostrar por defecto,
//Si se hace así, al hacer log-out, hay que borrar el registro de la imagen.. Quizas poner el nombre de la imagen en el mismo localStorage donde esta la info del usuario??

//Otra manera parecida implicaria cargar por defecto en el local la imagen predeterminada (cuando se hace log-in): img/img_perfil.png. Luego se sustituye con la funcion siguiente, y se borra al hacer log-out.

//U otra manera..


//Cambiar pfp cuando se submitea
botonImg.addEventListener('click',()=>{

    if (ImputImg.value!=''){
        //Esto Funciona
        //MainImg.src = "../img/img_perfil.png";

        //Nombre raro del archivo
        console.log(ImputImg.value)

        //asi que hardcodeamos un poco..
        //tomamos el nombre del archivo
        let imgSrc = ImputImg.value;

        //Substring nos deja agarrar la parte con el nombre del recurso
        //Concatenamos texto para forzar a que busque en la carpeta de imagenes.
        MainImg.src = "../img/" + imgSrc.substring(12);

        //Añadir a local--

        //Borrar value del iMput al terminar
        ImputImg.value='';
    }
    
})