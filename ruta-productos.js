const express = require("express");
const router = express.Router();
const fs = require("fs/promises");

// Ruta raíz GET /api/products
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await readProductsFile();

    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos." });
  }
});

// Ruta GET /api/products/:pid
router.get("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto." });
  }
});

// Ruta raíz POST /api/products
router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    await addProduct(newProduct);

    res.json({ message: "Producto agregado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto." });
  }
});

// Ruta PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    await updateProduct(productId, updatedFields);

    res.json({ message: "Producto actualizado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto." });
  }
});

// Ruta DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    await deleteProduct(productId);

    res.json({ message: "Producto eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto." });
  }
});

// Funciones auxiliares de manejo de productos
async function addProduct(product) {
  try {
    // Leer los productos existentes
    const products = await readProductsFile();

    // Validar campos obligatorios
    const requiredFields = [
      "title",
      "description",
      "code",
      "price",
      "status",
      "stock",
      "category",
    ];
    if (!requiredFields.every((field) => product[field])) {
      console.log("Error: Todos los campos son obligatorios.");
      return;
    }

    // Asignar un id autoincrementable al nuevo producto
    const id = products.length + 1;
    product.id = id;

    // Agregar el nuevo producto al arreglo
    products.push(product);

    // Guardar el arreglo actualizado en el archivo
    await writeProductsFile(products);

    console.log("Producto agregado:", product);
  } catch (error) {
    console.log("Error al agregar el producto:", error);
  }
}

async function updateProduct(id, updatedFields) {
  try {
    // Leer los productos existentes
    const products = await readProductsFile();

    // Encontrar el índice del producto a actualizar
    const productIndex = products.findIndex(
      (existingProduct) => existingProduct.id === id
    );

    if (productIndex !== -1) {
      // Actualizar el producto con los campos proporcionados
      products[productIndex] = { ...products[productIndex], ...updatedFields };

      // Guardar el arreglo actualizado en el archivo
      await writeProductsFile(products);

      console.log("Producto actualizado:", products[productIndex]);
    } else {
      console.log("Error: Producto no encontrado.");
    }
  } catch (error) {
    console.log("Error al actualizar el producto:", error);
  }
}

async function deleteProduct(id) {
  try {
    // Leer los productos existentes
    let products = await readProductsFile();

    // Filtrar los productos para excluir el producto con el id especificado
    products = products.filter((existingProduct) => existingProduct.id !== id);

    // Guardar el arreglo actualizado en el archivo
    await writeProductsFile(products);

    console.log("Producto eliminado con ID:", id);
  } catch (error) {
    console.log("Error al eliminar el producto:", error);
  }
}

async function readProductsFile() {
  try {
    const data = await fs.readFile("productos.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
// Funciones addProduct-updateProduct-deleteProduct
async function addProduct(product) {
  try {
    // Leer los productos existentes
    const products = await readProductsFile();

    // Validar campos obligatorios
    const requiredFields = [
      "title",
      "description",
      "code",
      "price",
      "status",
      "stock",
      "category",
    ];
    if (!requiredFields.every((field) => product[field] !== undefined)) {
      console.log("Error: Todos los campos son obligatorios.");
      return;
    }

    // Asignar un id autoincrementable al nuevo producto
    const id = products.length + 1;
    product.id = id;

    // Agregar el nuevo producto al arreglo
    products.push(product);

    // Guardar el arreglo actualizado en el archivo
    await writeProductsFile(products);

    console.log("Producto agregado:", product);

    return product;
  } catch (error) {
    console.log("Error al agregar el producto:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado en la ruta
  }
}

async function updateProduct(id, updatedFields) {
  try {
    // Leer los productos existentes
    const products = await readProductsFile();

    // Encontrar el índice del producto a actualizar
    const productIndex = products.findIndex(
      (existingProduct) => existingProduct.id === id
    );

    if (productIndex !== -1) {
      // Actualizar el producto con los campos proporcionados
      products[productIndex] = { ...products[productIndex], ...updatedFields };

      // Guardar el arreglo actualizado en el archivo
      await writeProductsFile(products);

      console.log("Producto actualizado:", products[productIndex]);

      return products[productIndex];
    } else {
      console.log("Error: Producto no encontrado.");
      return null;
    }
  } catch (error) {
    console.log("Error al actualizar el producto:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado en la ruta
  }
}

async function deleteProduct(id) {
  try {
    // Leer los productos existentes
    let products = await readProductsFile();

    // Filtrar los productos para excluir el producto con el id especificado
    products = products.filter((existingProduct) => existingProduct.id !== id);

    // Guardar el arreglo actualizado en el archivo
    await writeProductsFile(products);

    console.log("Producto eliminado con ID:", id);

    return true;
  } catch (error) {
    console.log("Error al eliminar el producto:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado en la ruta
  }
}

module.exports = router;
