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
  export const getComment = async (req, res, next) => {
    // console.log("here",req.body);
    try{
        let goodPost={};
        const data={
            text:req.body.comment
        }
        // console.log(comment);
    //     await googleapi(comment)
    //     .then(data => {
    //     console.log(JSON.stringify(data, null, 2)),
    //     goodPost = JSON.stringify(data.attributeScores.TOXICITY.summaryScore.value);
    //     console.log(goodPost);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    await axios.post('http://localhost:5001/api/predict', data)
    .then(response => {
      console.log(response.data);
      goodPost = response.data;
    })
    .catch(error => {
      console.error(error);
    });
   
    if(goodPost.identity_hate*10 <=1 && goodPost.insult*10 <=1 && goodPost.obscene*10 <=1 && goodPost.severe_toxic*10 && goodPost.threat*10 <=1 && goodPost.toxic*10<=1)
    {
      
          const post = await Post.findById(req.params.id);
          
               await post.updateOne({$push: {comments:data.text}});
               res.status(200).json({ message: "comment posted", comment: data.text })  
      }
      else{
            
        res.status(200).json("bad comment");
      }
    }
    catch(err){
        handleError(500,err);
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