
taskModel = require("../models/task.model.js");

async function getAll(req,res)
{   
   const products = await taskModel.getAll();
   res.send(products);
}
async function getProduct(id,res){
   const product = await taskModel.getProduct(id)
   res.send(product)
}
async function getMarcas(req,res)
{   
   const marcas = await taskModel.getMarcas();
   res.send(marcas);
}
async function getCategorias(req,res)
{   
   const categorias = await taskModel.getCategorias();
   res.send(categorias);
}

module.exports = {
    getAll,
    getProduct,
    getCategorias,
    getMarcas
}