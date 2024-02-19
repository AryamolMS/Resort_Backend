//import express
const express = require('express')

//import controller
const usercontroller = require('../Controller/userController')

//import rommsController
const roomController = require('../Controller/roomsController')

//import bookingcontroller
const bookingController = require('../Controller/bookingController')

//import multer
const multerConfig = require('../Middleware/multerMiddleware')

//import jwt
const jwtmiddleware = require('../Middleware/jwtMiddleware')

//craete an object
const router = new express.Router()

//setup path to resolve request
//register
   router.post('/user/register',usercontroller.register)
   
   //login
   router.post('/user/login',usercontroller.login)

   //rooms add
   router.post('/rooms/add',multerConfig.single('roomImage'),roomController.addRooms)

   //getall rooms
   router.get('/room/home',roomController.getallRooms)

   //edit rooms
   router.put('/room/edit/:id',multerConfig.single("roomImage"),roomController.editrooms)

   //delete
   router.delete('/room/delete/:id',roomController.deleterooms)

   //getall rooms
   router.get('/user/home',usercontroller.getaddedRooms)

   //edit profile
   router.put('/user/edit',jwtmiddleware,multerConfig.single('profile'),usercontroller.editprofile)

   //bookingrooms
  router.post('/user/bookings',jwtmiddleware,bookingController.booking)

   //userbookings
   router.get('/booking/user-bookings',jwtmiddleware,bookingController.getuserbookings)

   //allbookings
   router.get('/booking/all-bookings',bookingController.getallbookings)


 //export router
 module.exports=router  