const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    roomId:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phoneno:{
        type:Number,
        require:true
    },
    fromdate:{
        type:String,
        require:true    
    },
    todate:{
        type:String,
        require:true
    },
    totaldays:{
        type:Number,
        require:true
    },
    roomtype:{
        type:String,
        require:true
    },
    roomnos:{
        type:Number,
        require:true
    },
    Amount:{
        type:Number,
        require:true
    },
    totalamount:{
        type:Number,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})

const bookings = mongoose.model('bookings',bookingSchema)

module.exports = bookings