//import dotenv
require('dotenv').config()

//import express
const express = require('express')

//import cors
const cors = require('cors')

//import router
const router = require('./Router/router')

//import connection.js
require('./DB/connections')

//create server
const resortServer = express()

//use cors
resortServer.use(cors())

//converting to json
resortServer.use(express.json())

//use router
resortServer.use(router)

//use uploads
resortServer.use('/uploadimages',express.static('./uploadimages'))

//custamize port
const PORT = 4000 || process.env

//to run 
resortServer.listen(PORT,()=>{
    console.log(`resort Server running successfully at port no ${PORT}`);
})

resortServer.get('/',(req,res)=>{
    res.send(`<h1 style="color:green">resort server reunning successfully and ready to accept request from client</h1>`)
})