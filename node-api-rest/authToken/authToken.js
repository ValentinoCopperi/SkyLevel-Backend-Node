const jwt = require('jsonwebtoken')

async function authToken(req,res,next){
    try {
        const token = req.cookies?.token 
        
        if(!token){
            return res.json({
                message:'User not login',
                error : true,
                success:false
            })
        }
        
        jwt.verify(token,'secret',function(err,decoded){
            
            if(err) return  res.json({
                message:'User not login',
                error : true,
                success:false
            })
            
            req.userId = decoded?._id
            next()

        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data : [],
            succes : false,
            error : true
        })
    }
}

module.exports= {
    authToken
}