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

async function deleteUser(id){
   try {
        const db = await connectionPromise;
        const response = await db.query('DELETE FROM user WHERE id = ?',[id]);
        if (response[0].affectedRows > 0){
            return true
        }else{
            return false
        }
   } catch (error) {
        return false
   }
}

module.exports = {
    getUsers,
    deleteUser
}