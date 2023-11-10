// Agregamos un evento 'submit' al formulario con id 'formulario'
document.getElementById('formulario').addEventListener('submit', (e) =>{

// Evitamos el comportamiento predeterminado del formulario    
    e.preventDefault()
    
// Obtenemos los valores de los campos de contraseña y correo electrónico
    const pass = document.getElementById('pass').value;
    const mail = document.getElementById('mail').value;

// Imprimimos los valores en la consola (puedes eliminar esto en producción)
    console.log(pass);
    console.log(mail);

// Guardamos los valores en el localStorage (simulando un registro)
    localStorage.setItem('Email', mail);
    localStorage.setItem('pass', pass);

// Imprimimos el contenido actual del localStorage en la consola (puedes eliminar esto en producción)
    console.log(localStorage);

// Mostramos una alerta indicando que el registro fue exitoso
    alert('Registrado con éxito!');

// Redirigimos a la página de inicio (puedes cambiar 'index.html' según tu estructura de archivos)
    window.location.href = 'index.html';
})



