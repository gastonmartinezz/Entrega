
const isLoggedIn = true;
     
if (isLoggedIn) {
    const username = localStorage.getItem("Email");
    const usernameElement = document.getElementById("logged-in-username");
    usernameElement.textContent = username;
} 


const peugeot = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

// Función para obtener y agregar productos desde la API
async function agregarProductos() {
  try {
    const response = await fetch(peugeot);

    if (!response.ok) {
      throw new Error(`Error al obtener productos desde la API: ${response.status}`);
    }

    const data = await response.json();
    const cartProductsElement = document.getElementById("cartProducts");

    // Limpia la tabla de productos existente
    cartProductsElement.innerHTML = "";

    if (data.articles && Array.isArray(data.articles)) {
      // Recorre los artículos y agrégalos a la tabla
      data.articles.forEach(article => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td><img src="${article.image}" width="50px" alt="Imágen del producto ${article.name}"></td>
          <td>${article.name}</td>
          <td><span class="precio-unitario">${article.currency} ${article.unitCost}</span></td>
          <td><input class="cantidad" type="number" value="1" min="1"></td>
          <td>${article.currency}<span class="subtotal" type="number">${(article.unitCost * article.count)}</span></td>
        `;

        cartProductsElement.appendChild(fila);
      });

     
    
    } else {
      console.error();
    }
  } catch (error) {
    console.error(error);
  }
}

// Llama a la función para agregar productos desde la API al cargar la página
window.addEventListener("load", agregarProductos);






