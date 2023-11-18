const express = require('express');

const app = express();
const port = 3000;

// Configurar el directorio estático para servir archivos
app.use(express.static(__dirname));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
}); 