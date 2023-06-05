 mongoose =require( "mongoose")
const BookingSchema =new mongoose.schema({
    counsellorid:{
        type:String,
        required:true,
    },
    Userid:{
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
    issue:{
        type:String,
    }
    

})

export default mongoose.model("Booking", BookingSchema);