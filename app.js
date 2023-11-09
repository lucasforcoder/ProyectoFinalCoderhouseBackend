const ProductManager = require("./ProductManager");

const myProductManager = new ProductManager();

myProductManager.addProduct(
  "Manga 1",
  "Descripción del Manga 1",
  10.99,
  "thumbnail1.jpg",
  "M001",
  50
);
myProductManager.addProduct(
  "Manga 2",
  "Descripción del Manga 2",
  12.99,
  "thumbnail2.jpg",
  "M002",
  30
);

console.log("Todos los productos:", myProductManager.getProducts());
console.log("Producto con ID 1:", myProductManager.getProductById(1));
console.log("Producto con ID 3:", myProductManager.getProductById(3));
