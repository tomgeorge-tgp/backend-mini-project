 import mongoose from  "mongoose"
const BookingSchema =new mongoose.Schema({
    counsellorid:{
        type:String,
        required:true,
    },
    userid:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    start:{
        type:Date,
        required:true,

    },
    end:{
        type:Date,
        required:true,

    },
    
    status:{
        type:Boolean,
        default:true,
    }


})

export default mongoose.model("Booking", BookingSchema);