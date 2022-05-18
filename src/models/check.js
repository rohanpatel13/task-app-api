const mongoose = require('mongoose')

const checkScema = mongoose.Schema({
    name: {
        type: String,
    }
}) 

const Check = mongoose.model('Check',checkScema)

module.exports = Check
