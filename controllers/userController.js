import User from "../models/User.js";
import Post from "../models/Post.js";
export const getUser = async (req, res, next) => {
   try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
   }
   catch(err)
   {
    next(err);
   }
}

export const updateUser = async (req, res) =>{
    if(req.params.id == req.user.id){
    try{
          const updateUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set:req.body,
            },
            {
                new:true,
            });
            res.status(200).json(updateUser);
       }
       catch(err)
       {
           next(err);
       }
    }
    else{
        return next(handleError(403,"you can update only your own account"));
    }
}

export const deleteUser = async (req, res, next) =>{
    if (req.params.user == req.user.id){

        try{
         await User.findByIdAndDelete(req.params.id);
         await Post.remove({userId:req.params.id});
         res.status(200).json("User deleted")
        }
        catch(err){
           next(err);
        }
    }
        else
        {
            return next(handleError(403,"you can only delete your own account"));
        }
    
}