import mongoose from "mongoose";
const ScheduleSchema =new mongoose.Schema({
    counsellorid:{
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
        type:Boolean,//True indicates session available ,False not available
        default:true,
    }
    

})
ScheduleSchema.index({userId:1,start:1,end:1},{unique:true})

export default mongoose.model("Schedule", ScheduleSchema);