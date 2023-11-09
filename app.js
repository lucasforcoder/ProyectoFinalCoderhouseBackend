const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const port = 3000; // Puedes cambiar el puerto si es necesario
const productManager = new ProductManager("./products.json"); // Asegúrate de que 'products.json' existe y tiene algunos productos

// Agregar productos
productManager.addProduct({
  title: "Manga 1",
  description: "Descripción del Manga 1",
  price: 10.99,
  thumbnail: "thumbnail1.jpg",
  code: "M001",
  stock: 50,
});

productManager.addProduct({
  title: "Manga 2",
  description: "Descripción del Manga 2",
  price: 12.99,
  thumbnail: "thumbnail2.jpg",
  code: "M002",
  stock: 30,
});

// Obtener y mostrar todos los productos
const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

// Obtener y mostrar un producto por ID
const productById = productManager.getProductById(1);
console.log("Producto con ID 1:", productById);

// Actualizar un producto
productManager.updateProduct(1, { price: 14.99, stock: 40 });

// Obtener y mostrar todos los productos actualizados
const updatedProducts = productManager.getProducts();
console.log("Todos los productos actualizados:", updatedProducts);

// Eliminar un producto por ID
productManager.deleteProduct(2);

// Obtener y mostrar todos los productos después de la eliminación
const remainingProducts = productManager.getProducts();
console.log("Productos restantes:", remainingProducts);

// Endpoint para obtener todos los productos con límite opcional
app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos." });
  }
});

// Endpoint para obtener un producto por ID
app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto." });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
