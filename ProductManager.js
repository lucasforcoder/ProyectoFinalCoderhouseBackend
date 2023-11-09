class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que no se repita el campo "code"
    if (this.products.some((product) => product.code === code)) {
      console.log("Error: El código ya existe.");
      return;
    }

    // Validar que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Error: Todos los campos son obligatorios.");
      return;
    }

    // Crear un producto con id autoincrementable
    const id = this.products.length + 1;
    const product = { id, title, description, price, thumbnail, code, stock };

    // Agregar el producto al arreglo de productos
    this.products.push(product);

    console.log("Producto agregado:", product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (product) {
      return product;
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }
}

module.exports = ProductManager;
