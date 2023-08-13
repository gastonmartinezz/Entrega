
const fichas = document.getElementsByClassName("fichas")[0];

function crearFichas(registro){
    for (const i of registro){
        fichas.innerHTML +=
            `
            <div>
                <img src= ${i.image}></img>
                <p> ${i.name} </p>
                <p> ${i.currency} ${i.cost} </p>
            <div>
            `
    }
};


const autosURL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

fetch(autosURL)
.then(response => response.json())
.then(data => crearFichas(data.products));

