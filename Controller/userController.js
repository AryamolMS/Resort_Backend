//logic to resolve request

//import model
const users = require('../modal/userSchema')

//import room model
const rooms = require('../modal/roomSchema')

//import jwt
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    console.log(req.body);
    //logic
    console.log('Register sucessfull');

    const {username,email,password} = req.body

   try{const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json('Account already exist please login')
    }
    else{
        //need to register
        //create object for model
        const newUser = new  users({
            username,
            email,
            password,
            profile:""
        })
        //add to mongodb
        await newUser.save()
        //response
    res.status(200).json(newUser)
    }

 }  
 catch(err){
    res.status(401).json(`Request failed due to ${err}`)
 } 
}


//login
exports.login = async(req,res)=>{

    const {email,password} = req.body

   try{ const existingUser = await users.findOne({email,password})
    console.log(existingUser);

    if(existingUser){

       const token = jwt.sign({userId:existingUser._id},"Secrectkey12345")
        res.status(200).json({
            existingUser,
            token
        })
    }
    else{
        res.status(404).json('Invalid email or password')
    }}catch(err){
        res.status(401).json(`Login request failed due to ${err}`)
    }
}


//display rooms
exports.getaddedRooms = async(req,res)=>{
    try {
        const displayroom = await rooms.find()
        res.status(200).json(displayroom)
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)

    }
}

//edit profile
exports.editprofile = async(req,res)=>{
    const userId = req.payload
    const {username,email,password,profile} = req.body

    const profileImage = req.file?req.file.filename:profile

    try {
        const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,profile:profileImage},{new:true})

        await updateUser.save()
        res.status(200).json(updateUser)

    } catch (error) {
        res.status(401).json(error)
    }
}