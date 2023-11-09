const fs = require("fs/promises");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }

  async init() {
    this.products = await this.readProductsFile();
  }

  async addProduct(product) {
    // Validar que no se repita el campo "code"
    if (
      this.products.some(
        (existingProduct) => existingProduct.code === product.code
      )
    ) {
      console.log("Error: El código ya existe.");
      return;
    }

    // Validar que todos los campos sean obligatorios
    const requiredFields = [
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stock",
    ];
    if (!requiredFields.every((field) => product[field])) {
      console.log("Error: Todos los campos son obligatorios.");
      return;
    }

    // Asignar un id autoincrementable al nuevo producto
    const id = this.products.length + 1;
    product.id = id;

    // Agregar el nuevo producto al arreglo
    this.products.push(product);

    // Guardar el arreglo actualizado en el archivo
    await this.writeProductsFile(this.products);

    console.log("Producto agregado:", product);
  }

  async getProducts() {
    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find(
      (existingProduct) => existingProduct.id === id
    );

    if (product) {
      return product;
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }

  async updateProduct(id, updatedFields) {
    // Encontrar el índice del producto a actualizar
    const productIndex = this.products.findIndex(
      (existingProduct) => existingProduct.id === id
    );

    if (productIndex !== -1) {
      // Actualizar el producto con los campos proporcionados
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
      };

      // Guardar el arreglo actualizado en el archivo
      await this.writeProductsFile(this.products);

      console.log("Producto actualizado:", this.products[productIndex]);
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }

  async deleteProduct(id) {
    // Filtrar los productos para excluir el producto con el id especificado
    this.products = this.products.filter(
      (existingProduct) => existingProduct.id !== id
    );

    // Guardar el arreglo actualizado en el archivo
    await this.writeProductsFile(this.products);

    console.log("Producto eliminado con ID:", id);
  }

  async readProductsFile() {
    try {
      // Leer el archivo de productos y parsear su contenido
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o hay un error, retornar un arreglo vacío
      return [];
    }
  }

  async writeProductsFile(products) {
    // Convertir el arreglo de productos a formato JSON y escribirlo en el archivo
    await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
  }
}

module.exports = ProductManager;
