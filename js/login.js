document.getElementById('formulario').addEventListener('submit', (e) =>{
    e.preventDefault()
    const pass = document.getElementById('pass').value;
    const mail = document.getElementById('mail').value;

    console.log(pass);
    console.log(mail);

    localStorage.setItem('Email', mail);
    localStorage.setItem('pass', pass);

    //console.log(localStorage);

    alert('Registrado con éxito!');

    //window.location.href = 'index.html';

    fetch('./login', {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({m:mail, p:pass})
    })
    .then(response => console.log(response));

});