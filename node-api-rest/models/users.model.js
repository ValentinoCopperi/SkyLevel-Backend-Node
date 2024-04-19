const mysql = require('mysql2/promise');

const connectionPromise = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sky_level'
})


async function getUsers() {
    const db = await connectionPromise;
    const response = await db.query('SELECT * FROM user');
    return response[0];
}

module.exports = {
    getUsers
}