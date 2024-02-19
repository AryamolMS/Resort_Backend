

const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Services:{
        type:String,
        require:true
    },
    Count:{
        type:Number,
        require:true
    },
    Type:{
        type:String,
        require:true
    },
    Amount:{
        type:Number,
        require:true
    },
    roomImage:{
        type:String,
        require:true
    }
})

const rooms = mongoose.model('rooms',roomSchema)

module.exports = rooms