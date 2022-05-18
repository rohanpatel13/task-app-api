const express = require("express")
const  multer = require('multer')
require('./src/db/mongoose.js')
const User = require('./src/models/user')
const app = express()

const port = process.env.PORT

//Middleware
// app.use((req,res,next)=>{
//     console.log(req.method,req.path)
//     next()
// })


const userRouter = require('./src/routers/user')
const taskRouter = require('./src/routers/task')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const upload = multer({
    dest: 'images'
})

app.listen(port,()=>{
    console.log("SetUp : " + port)
})

app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
})


// const bcrypt = require('bcryptjs')

// const myFunc = async ()=>{
//     const pass = 'Rohan123'
// const hashedPass = await bcrypt.hash(pass,8)

// console.log(pass + " " + hashedPass)
// const isValid = await bcrypt.compare('rohan123',hashedPass)
// console.log(isValid)
// }

// myFunc()

// const jwt = require('jsonwebtoken')
// const myFunc = async () =>{
//     const token = jwt.sign({_id: 'abcd13'},'rohan',{expiresIn: '0 seconds'})
//     console.log(token)

//     const data = jwt.verify(token,'rohan')
//     console.log(data)
// }
// myFunc()