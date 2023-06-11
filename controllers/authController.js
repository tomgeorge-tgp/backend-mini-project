import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { handleError } from "../error.js";

const register = async (req, res,next) => {
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
    }).status(200).json(otherData);
  }
  catch (err) {
     next(err);
  }
}

const login =async(req,res,next)=>{
  try{
     const user = await User.findOne({email:req.body.email});
     if (!user) return next(handleError(404,"User not found"));
     const isCorrect = await bcrypt.compare(req.body.password,user.password);

     if (!isCorrect) return next(handleError(404,"Invalid password"));

     const token =jwt.sign({id:user._id},process.env.JWT);
     const {password,...otherData} = user._doc;

     res.cookie("access_token",token,{httpOnly:true}).status(200).json(otherData);
     console.log("Access token",token)
  }catch(err)
  {
    next(err); 
  }
}



   export {
    register,
    login,
    // logout,
    
  };
  