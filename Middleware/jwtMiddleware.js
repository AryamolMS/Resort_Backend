const jwt=require('jsonwebtoken')

const jwtmiddleware=(req,res,next)=>{
    console.log('inside jwt middleware');

    const token = req.headers["authorization"].split(' ')[1]
    console.log(token);

    try{
        const jwtResponse=jwt.verify(token,"Secrectkey12345")
        console.log(jwtResponse);
        req.payload=jwtResponse.userId
        next()//need to go control
    }
    catch(err){
        res.status(401).json('Authorization Failed....Please Login')
    }
    
}

module.exports=jwtmiddleware
