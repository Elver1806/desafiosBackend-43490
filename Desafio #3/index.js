const express = require("express");
const fs = require("fs");
const app = express();

const getFile = async () => {
  const fileRaw = await fs.readFileSync("./productos.txt");
  return JSON.parse(fileRaw);
};

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

app.get("/", async (req, res) => {
  const products = await getFile();
  res.send(products);
});
app.get("/productRandom", async (req, res) => {
  const products = await getFile();
  const numberRandom = getRandom(0, products.length - 1);
  res.send(products[numberRandom]);
});
const port = 8000;
const server = app.listen(port, () => {
  console.log(`Servidor en el puerto ${port} `);
});

module.exports = server;
