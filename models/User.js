import mongoose from "mongoose";

const UserSchema =new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        unique:true,
    },
    type:{
       type:String,
       required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    description:{
         type:String
    },
    year:{
        type:String,
        
    },
    role:{
        type:String,
    },
    department:{
        type:String,
        
    }
},{timestamps:true}
);
export default mongoose.model("User",UserSchema);