const rutaArchivo = "./productos.txt";
const fs = require("fs");
class Contenedor {
  async getById(id) {
    const file = await fs.readFileSync(`${rutaArchivo}`);
    const jsonFile = JSON.parse(file);
    return jsonFile.find((product) => product.id === id);
  }
  async getAll() {
    const file = await fs.readFileSync(`${rutaArchivo}`);
    const jsonFile = JSON.parse(file);
    return jsonFile;
  }
  async save(objProduct) {
    if (!(objProduct.title && objProduct.price && objProduct.thumbnail)) {
      return "Falta una Propiedad del Objeto";
    }
    const products = await this.getAll();
    let newId = 1;
    if (products.length > 0) {
      const ids = products.map((product) => product.id);
      newId = Math.max(...ids) + 1;
    }

    objProduct.id = newId;
    products.push(objProduct);
    await fs.writeFileSync(`${rutaArchivo}`, JSON.stringify(products));
    return `Producto creado con el id ${objProduct.id}`;
  }
  async deleteById(id) {
    const productos = await this.getAll();
    await fs.writeFileSync(
      `${rutaArchivo}`,
      JSON.stringify(productos.filter((product) => product.id !== id))
    );
    return `Producto con el id ${id} eliminado`;
  }
  async deleteAll() {
    await fs.writeFileSync(`${rutaArchivo}`, JSON.stringify([]));
    return "Archivos Eliminados";
  }
}

const claseContenedor = new Contenedor();

//Call getById
// claseContenedor.getById(1).then((data) => console.log(data));
// //Call getAll
// claseContenedor.getAll().then((data) => console.log(data));
// //Call Metodo Save
claseContenedor
  .save({
    id: 7,
    title: "Tarta de Manzana",
    price: 100,
    thumbnail: "url here",
  })
  .then((data) => console.log(data));
// //Call Metodo DeleteById
// claseContenedor.deleteById(8).then((data) => console.log(data));
// //Call Metodo DeleteAll
// claseContenedor.deleteAll().then((data) => console.log(data));
