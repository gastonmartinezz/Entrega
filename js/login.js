document.getElementById('formulario').addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('pass').value;
    const mail = document.getElementById('mail').value;

    console.log(pass);
    console.log(mail);

    localStorage.setItem('Email', mail);
    localStorage.setItem('pass', pass);

    let jason = { mail: mail, pass: pass };

    fetch('./login', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jason)
    })
    .then(response => response.json())
    .then(data => {
        const token = data.token;
        console.log('Access Token:', token);

        window.location.href = 'index.html';
    })
});
