import Post from "../models/Post.js"
import { handleError } from "../error.js";
import User from "../models/User.js";

export const createPost = async(req,res,next)=>{
    const newPost =new Post(req.body);

    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(err){
        handleError(500,err);
    }
}

export const deletePost = async(req,res,next)=>{

    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.id) {
             await post.deleteOne();
             res.status(200).json("post has been deleted");
        
        }
        else{
           handleError (500,err);
        }
    }
    catch(err){
        handleError(500,err);
    }
}

export const likeOrDislike = async(req,res,next)=>{


    try{
        const post = await Post.findById(req.params.id);
        if(post.likes.includes(req.body.id)){
             await post.updateOne({$push: {likes:req.body.id}});
             res.status(200).json("post has been liked");
        
        }
        else{
          await post.updateOne({$pull: {likes:req.body.id}});
          res.status(200).json("post has been diliked");
        }
    }
    catch(err){
        handleError(500,err);
    }
}

export const getExplorePosts = async (req, res, next) => {
    try 
    {  
        const allPosts = await Post.find().sort(
            {likes:-1,createAt:-1}
        );
         res.status(200).json(allPosts);
    } 
    catch (err) {
      handleError(500, err);
    }
  }
 
  export const getUserPosts = async (req, res, next) => {
    try 
    {  
        const userPosts = await Post.find({userId:req.params.id}).sort({
            createAt:-1,
        });
        res.status(200).json(userPosts);
    } 
    catch (err) {
      handleError(500, err);
    }
  }
    

export const getFollowerPosts = async(req,res,next)=>{


    try{
        const currentUser = await User.findById(req.params.id);
        const userPosts = await Post.find({userId: currentUser._id});
        const followersPosts = await Promise.all(
            currentUser.following.map((followerId)=>{
                return Post.find({userId: followerId});
            })
        );
        res.status(200).json(userPosts.concat(...followersPosts));
    }
    catch(err){
        handleError(500,err);
    }
}