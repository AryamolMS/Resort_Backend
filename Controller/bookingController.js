const bookings = require('../modal/bookingSchema')
// const users = require('../modal/userSchema')

exports.booking = async(req, res) => {
  const userId = req.payload
  console.log(req.body);
  const {
    username, email, phoneno, fromdate, todate, totaldays, roomtype, roomnos, Amount, roomId,
  } = req.body;
  /* console.log(    username, email, phoneno, fromdate, todate, totaldays, roomtype, roomnos, Amount, roomId,
    ); */  

  try {
    
    const existingBooking = await bookings.findOne({ roomId, userId});

    if (existingBooking) {
      
      existingBooking.totalamount = existingBooking.roomnos * existingBooking.Amount * existingBooking.totaldays;

      await existingBooking.save();
      res.status(200).json({ message: 'Room already booked, updating details', bookingDetails: existingBooking });
    } else {
    
      const newBooking = new bookings({
        roomId,
        username,
        email,
        phoneno,
        fromdate,
        todate,
        totaldays,
        roomtype,
        roomnos,
        Amount,
        totalamount:Amount,
        userId:req.payload
      });

      await newBooking.save();
      res.status(200).json({ message: 'Booking successful', bookingDetails: newBooking });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Internal Server Error' });
  }
}

//userbookings
exports.getuserbookings = async(req,res)=>{
  const userId = req.payload

  try {
    const userbookings = await bookings.find({userId})
    res.status(200).json(userbookings)
  } catch (error) {
    res.status(401).json(`${error}`)
  }
}

//allbookings
exports.getallbookings = async(req,res)=>{
  const search = req.query.search
  console.log(search);
  const query = {
    username:{
      $regex:search,$options:'i'
    }
  }
try {
  const allbookings = await bookings.find(query)
  res.status(200).json(allbookings)
} catch (error) {
  res.status(401).json(`${error}`)

}
}