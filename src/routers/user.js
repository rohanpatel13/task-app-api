const express = require('express')
const router =  express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

const upload = multer({
    storage: multer.memoryStorage(),
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/user/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
    
        res.send({user,token})
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }

})

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch(e){
        res.status(400).send(e)
    }
})


router.get('/users/me', auth, async (req,res)=>{
    // try{
    //     const user = await User.find({})
    //     res.send(user)
    // }catch(e){
    //     res.status(400).send(e)

    // }
    res.send(req.user)
})

router.get('/user/:name/:age',async (req,res)=>{
    const name = req.params.name
    const age = req.params.age

    try{
        const user = await User.find({name,age})
        if(user.length <= 0){
            return res.status(404).send("No user found")
        }
        res.send(user)

    }catch(e){
        res.status(400).send(e)
    }
    console.log(req.params)
})

// update only passed data
router.patch('/users/me',auth ,async (req,res)=>{

    const updates = Object.keys(req.body)
    const allowedParam = ['name', 'age', 'password', 'email']
    const isValid = updates.every((param)=>{
        return allowedParam.includes(param)
    })

    if(isValid){
        try{

            updates.forEach((update)=>req.user[update] = req.body[update])
            await req.user.save()
         
            res.send(req.user)
        }catch(e){
            console.log("error " + e)
            res.status(400).send(e)
        }
    }
    else{
        res.status(404).send('No field found')
    }

})

// // update all data and take as new data
// router.patch('/user/:name',async (req,res)=>{

//     const updates = Object.keys(req.body)
//     const allowedParam = ['name', 'age', 'password', 'email']
//     const isValid = updates.every((param)=>{
//         return allowedParam.includes(param)
//     })
//     if(isValid){
//         try{
//             const user = await User.updateMany({name:req.params.name},req.body,{new: true,runValidators: true}                )
//             console.log("sss: " + user)
//             if(!user){
//                 return res.status(404).send("Not found")
//             }
//             res.send(user)
//         }catch(e){
//             console.log("error " + e)
//             res.status(400).send(e)
//         }
//     }
//     else{
//         res.status(404).send('No field found')
//     }

// })



router.delete('/users/me', auth, async (req,res)=>{
    try{
        // const user =  await User.findByIdAndDelete(req.user._id)
        // if(user.deletedCount==0){
        //     return res.status(404).send("Not found")
        // }
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})


router.post('/users/logout', auth, async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send(['Successfully logout', req.token ])
    }catch(e){
        res.status(500).send(e)
    }   

})

router.post('/users/logoutAll', auth, async (req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send(['Successfully logout all', req.token ])
    }catch(e){
        res.status(500).send(e)
    }   
})

router.post('/users/me/avatar', auth,upload.single('avatar'),async (req,res)=>{
    // req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async(req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/me/avatar', async (req,res)=>{
    const user =await   User.findById('628331b2c0538c1c8e0601a5')
    try{
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send(e.message)
    }
})


module.exports = router