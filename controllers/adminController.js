import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { handleError } from "../error.js";
import User from "../models/User.js"
import Post from "../models/Post.js"
import dotenv from "dotenv"
dotenv.config();
import { all } from "axios";

export const login =async(req,res,next)=>{
    try{
       const user = process.env.email
       if (user==req.body.email) return next(handleError(404,"Invalid Credentials"));
      //  const isCorrect =  bcrypt.compare(req.body.password,process.env.password);
  
       if (req.body.password!=process.env.password) return next(handleError(404,"Invalid password"));
  
      //  const token =jwt.sign({id:user._id},process.env.JWT);
      //  const {password,...otherData} = user._doc;
  
      //  res.cookie("access_token",token,{httpOnly:true}).status(200).json({token,otherData});
      //  console.log("Access token",token)
    }catch(err)
    {
      next(err); 
    }
  }
  
 export const register = async (req, res,next) => {
    // const { fulName,lastName,phoneNumber,email,password,address,city,state,country,zipCode } = req.body;
    // console.log(req.body);
    try{

    
    const currentUserEmail = req.body.email;
    const userType=req.body.type;
    const emailAlreadyExists = await User.findOne({ currentUserEmail });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }
    const salt= bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    const newUser =new User({...req.body,password:hash});
    await newUser.save();

    const token =jwt.sign({id:newUser._id},process.env.JWT);
    const {password,...otherData}=newUser._doc;
    res.cookie("access_token",token,{
      httpOnly:true,
    }).status(200).json({token,otherData});
  }
  catch (err) {
     next(err);
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
export const allUser=async(req,res,next)=>{
  try{
  const userType=req.body.type;
  const allDetails=await User.find({type:userType})
  return res.status(200).json(allDetails)
  }
  catch(err){
    console.log(err)

  }

}


  