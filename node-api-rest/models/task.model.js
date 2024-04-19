const mysql = require('mysql2/promise');

const connectionPromise = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sky_level'
})

async function getAll() {
    const db = await connectionPromise;
    const response = await db.query('SELECT p.id_producto, p.producto, pi.imagen_1 , pi.imagen_2, pi.imagen_3,p.datos,p.precio, c.categoria, m.marca FROM producto p INNER JOIN producto_imagen pi ON p.id_producto_imagen = pi.id_imagen INNER JOIN categoria c ON p.id_categoria = c.id_categoria INNER JOIN marca m ON p.id_marca = m.id_marca;');
    return response[0];
}
async function getProduct(id) {
    const db = await connectionPromise
    const response = await db.query('SELECT p.id_producto, p.producto, p.precio, p.datos, p.id_producto_imagen, pi.imagen_1, pi.imagen_2, pi.imagen_3, c.categoria, m.marca FROM producto p JOIN producto_imagen pi ON p.id_producto_imagen = pi.id_imagen JOIN categoria c ON p.id_categoria = c.id_categoria JOIN marca m ON p.id_marca = m.id_marca WHERE p.id_producto = ?',[id])
    return response[0]
}
async function getMarcas() {
    const db = await connectionPromise;
    const response = await db.query('SELECT * FROM marca');
    // const response = await db.query('SELECT * FROM producto')
    return response[0];
}
async function getCategorias() {
    const db = await connectionPromise;
    const response = await db.query('SELECT * FROM categoria');
    // const response = await db.query('SELECT * FROM producto')
    return response[0];
}

module.exports = {
    getAll,
    getProduct,
    getMarcas,
    getCategorias
}