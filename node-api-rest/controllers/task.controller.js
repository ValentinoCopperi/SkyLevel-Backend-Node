
taskModel = require("../models/task.model.js");

async function getAll(req, res) {
   try {
      const products = await taskModel.getAll();
      if (!products) res.status(200).json({ error: true, success: false, message: 'No products found' })
      res.status(200).json({ data: products, error: false, success: true, message: 'Get products successfully' });
   } catch (error) {
      res.json({ error: true, success: false, message: 'Error on getting products' })
   }
}
async function getProduct(id, res) {
   const product = await taskModel.getProduct(id)
   res.send(product)
}
async function getMarcas(req, res) {
   try {
      const marcas = await taskModel.getMarcas();
      if (!marcas) res.status(200).json({ error: true, success: false, message: 'No brands found' })
      res.status(200).json({ data: marcas, error: false, success: true, message: 'Get brands successfully' });
   } catch (error) {
      res.json({ error: true, success: false, message: 'Error on getting brands' })
   }
}
async function getCategorias(req, res) {
   try {
      const categorias = await taskModel.getCategorias();
      if (!categorias) res.status(200).json({ error: true, success: false, message: 'No categories found' })
      res.status(200).json({ data: categorias, error: false, success: true, message: 'Get categories successfully' });
   } catch (error) {
      res.json({ error: true, success: false, message: 'Error on getting categories' })
   }

}

module.exports = {
   getAll,
   getProduct,
   getCategorias,
   getMarcas
}