const usersModel = require('../models/users.model')

async function getUsers (req,res) {
    try {
        const data = await usersModel.getUsers()
        if(!data) return  res.json({Status:200, Error : false , Message : 'Users is empty'})

        res.json({Data:data,Error:false,Message:'Users found'})

    } catch (error) {
        res.json({Status:404, Error : true , Message : 'Error on geting users'})
    }
}

module.exports= {
    getUsers
}