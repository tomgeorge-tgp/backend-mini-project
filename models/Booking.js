 import mongoose from  "mongoose"
const BookingSchema =new mongoose.Schema({
    counsellorId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true,

    },
    to:{
        type:String,
        required:true,

    },
    
    status:{
        type:Boolean,
        default:true,
    }


})

export default mongoose.model("Booking", BookingSchema);