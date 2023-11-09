const ProductManager = require("./ProductManager");

const productManager = new ProductManager("products.json");

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
