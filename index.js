const express = require('express');
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken')
const port = 3000;
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(cors({
  origin:'http://localhost:5173',
  credentials : true
}))
app.use(bodyParser.json())
app.use(cookieParser())
const taskController = require("./node-api-rest/controllers/task.controller.js");
const authController = require("./node-api-rest/controllers/auth.controller.js")
const userDetailsController = require("./node-api-rest/controllers/userDetails.controller.js")
const authToken = require('./node-api-rest/authToken/authToken.js')
app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/login', (req,res)=>{
  authController.authLogin(req,res)
  
})
app.get('/logout' , (req,res) => {
  authController.userLogout(req,res)
})
app.get('/productos' , (req,res)=>{
    taskController.getAll(req,res);
} )
app.get('/productos/:id' , (req,res)=>{
    let id = req.params.id
    taskController.getProduct(id,res);
} )

app.get('/marcas' , (req,res)=>{
    taskController.getMarcas(req,res);
} )
app.get('/categorias' , (req,res)=>{
    taskController.getCategorias(req,res);
} )
app.post('/register', (req,res)=>{
  authController.authRegister(req,res)
})

app.get('/user-details' ,authToken.authToken, userDetailsController.userDetails)




// app.use('/' , routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})