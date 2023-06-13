import mongoose from 'mongoose';

const PostSchema =new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    anonymous:{
        type:Boolean,
        default:true,
        required:true,
    },
    verified:{
        type:Boolean,
        default:false,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    likes:{
        type:Array,
        defaultValue:[],
    },
    comments:{
        type:Array,
        defaultValue:[],
    },
},
{timestamps:true});

export default mongoose.model('Post',PostSchema);