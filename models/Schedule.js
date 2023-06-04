import mongoose from "mongoose";
const ScheduleSchema =new mongoose.schema({
    email:{
        type:String,
        unique:true,
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