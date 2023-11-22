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

    let jason = {mail:'abc', pass:'wasd'};

    fetch('./login', {
        method:"POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jason)
    })
    .then(response =>response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))

});