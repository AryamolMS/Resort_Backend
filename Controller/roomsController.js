
const rooms = require('../modal/roomSchema')

exports.addRooms = async(req,res)=>{
    console.log('Inside room controller');

    const roomImage = req.file.filename
    console.log(roomImage);

    const {Name,Services,Count,Type,Amount} = req.body

    console.log (`${Name},${Services},${Count},${Type}, ${Amount},${roomImage}`)
    
    try {
        const Existingroom = await rooms.findOne({Name})

        if(Existingroom){
            res.status(406).json("Already exist......")
        }
        else{
            const newRoom = new rooms ({
                Name,Services,Count,Type,Amount,roomImage
            })
            await newRoom.save()
            res.status(200).json(newRoom)
        }
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }

   
}

//display rooms

exports.getallRooms = async(req,res)=>{
    try {
        const allRooms = await rooms.find()
        res.status(200).json(allRooms)
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)

    }
}

//edit rooms
exports.editrooms = async(req,res)=>{
    const {id} = req.params
    const {Name,Services,Count,Type,Amount,roomImage} = req.body
    const uploadImages = req.file?req.file.filename:roomImage

    try{
        const updatedata = await rooms.findByIdAndUpdate(
            {_id:id},{Name,Services,Count,Type,Amount,roomImage:uploadImages},{new:true}
        )
        await updatedata.save()
        res.status(200).json(updatedata)
    }
    catch(err){
        res.status(401).json(err)
    }
}

//delete
exports.deleterooms=async(req,res)=>{
    const {id}=req.params
    try {
      const removeroom=await rooms.findByIdAndDelete({_id:id})
      res.status(200).json(removeroom)
    } catch (err) {
        res.status(401).json(err)
}

}

