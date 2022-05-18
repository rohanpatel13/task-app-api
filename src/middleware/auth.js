 const jwt = require('jsonwebtoken')
 const User = require('../models/user')
 
 
 const auth = async (req, res, next)=>{
     console.log('auth middleware')

    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const validate = jwt.verify(token,'rohan')
        const user = await User.findOne({_id: validate._id,'tokens.token': token})

        if(!user){
            throw new error('Not found')
        }
        req.token = token
        req.user = user
        next()
        
    }catch(e){
        res.status(401).send({error: ' pls authenticate'})

    }


 }

 module.exports = auth