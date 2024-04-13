const authModel = require('../models/auth.model')

async function authLogin(req,res){
   try {
      const user = req.body.user
      const password = req.body.password  
      authModel.signIn(user,password,res)
   } catch (error) {
      res.json({Error:'Failed Sign In'})
   }
}


 function authRegister(req,res){
   try {
      const user = req.body.user
      const password = req.body.password
      authModel.authRegister(user,password,res)
   } catch (error) {
      res.json({Error:'Error while inserting data'})
   }
}

async function userLogout(req,res){
   try {
      res.clearCookie('token')
      res.json({
         messagge : 'logged out succesfully',
         error:false,
         success:true,
         data:[]
      })
   } catch (error) {
      res.json({
         error:true,
         message : error.message
     })
   }
}

module.exports ={
   authLogin,
   authRegister,
   userLogout
}