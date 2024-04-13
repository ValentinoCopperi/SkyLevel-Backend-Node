const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



const connectionPromise = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sky_level'
})

function asignarToken(data) {

}

async function signIn(user, password, res) {
    const db = await connectionPromise
    const userExist = await db.query('SELECT * FROM user WHERE email = ?', [user])
    if (userExist[0].length == 0) return res.json({ Error: "Usuario no encontrado" })
    try {

        const passwordRes = await bcrypt.compare(password.toString(), userExist[0][0].password.toString())

        /*function(err,result){
            if (err) {
                // Manejar errores de comparación
                console.error("Error al comparar contraseñas:", err);
                return res.json({Error: "Error de comparación de contraseñas"});
            }
            // Enviar el resultado de la comparación
        */
        if (passwordRes == true) {
            const userEmail = userExist[0][0].email
            const tokenData = {
                _id : userExist[0][0].id,
                email: userExist[0][0].email
            }
            const token = await jwt.sign(tokenData ,'secret',{expiresIn : 60 * 60})
            const tokenOption = {
                httpOnly : true,
                secure:true
            }

            res.cookie("token",token, tokenOption).json({ Status: passwordRes,data:token})
        } else {
            return res.send({ Status: passwordRes })
        }



    } catch (error) {
        res.json({ Error: "Login error" })
    }


}

async function authRegister(user, password, res) {
    const db = await connectionPromise
    const userExist = await db.query('SELECT * FROM user WHERE email = ?', [user])
    if (userExist[0].length >= 1) return res.json({ Error: "Ya existe un usuario con ese mail" })
    try {

        bcrypt.hash(password.toString(), 10, async (err, hash) => {
            if (err) return res.json({ Error: "Error for hassing password" })


            const response = await db.query('INSERT INTO user (id,email,password) VALUES(NULL,?,?)', [user, hash])
            res.send({ Status: 'Success' })
        })

    } catch (error) {
        res.json({ Error: 'Error while inserting data' })
    }
}

module.exports = {
    //getUser,
    signIn,
    authRegister
}