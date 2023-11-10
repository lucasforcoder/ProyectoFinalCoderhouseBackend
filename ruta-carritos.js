// En tu archivo principal (app.js o donde manejes la configuración de Express)

const express = require("express");
const productRouter = require("./ruta-productos"); // Asegúrate de que el nombre de tu archivo sea correcto
const cartRouter = require("./ruta-carritos"); // Asegúrate de que el nombre de tu archivo sea correcto

const app = express();
const port = 8080;

app.use(express.json());

// Configuración de las rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
