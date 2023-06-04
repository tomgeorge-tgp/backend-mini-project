import mongoose from "mongoose";
const BookingSchema =new mongoose.schema({
    counselloremail:{
        type:String,
        required:true,
    },
    Useremail:{
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

    }
    

})

export default mongoose.model("Schedule", ScheduleSchema);