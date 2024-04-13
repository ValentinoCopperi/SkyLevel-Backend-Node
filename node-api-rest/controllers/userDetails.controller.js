const authModel = require('../models/auth.model')

async function userDetails(req,res){
    try {
       const user = await authModel.findById(req.userId)
       res.json({
        data:user[0][0],
        error:false,
        success:true,
        message:'User details'
        })
    } catch (error) {
        res.json({
            error:true,
            message : error.message
        })
    }
}
module.exports = {
    userDetails
}