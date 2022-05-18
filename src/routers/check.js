const express = require('express')
const Check = require('../models/check')
const router = new express.Router()


router.get('/check',async (req, res)=>{
    console.log('innnnn')
    const check = new Check({
        name: 'Testing'
    })
    try{
        await check.save()
        res.send('Success')
    }catch(e){
        res.send('error')

    }

})

module.exports = router