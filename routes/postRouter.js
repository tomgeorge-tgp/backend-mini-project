import express from 'express';
import { verifyToken } from '../verify.js';
import {
    createPost,
    deletePost,
    likeOrDislike,
    getExplorePosts,
    getFollowerPosts,
    getUserPosts,
    
} from "../controllers/postController.js"
const postRouter=express.Router();

//create post
postRouter.post('/',verifyToken, createPost);

//delete post
postRouter.delete('/:id',verifyToken, deletePost);

//Like or Dislike a post
postRouter.post('/:id/',likeOrDislike);

//get all  posts
postRouter.get('/explore',getExplorePosts);

//get all user followers posts
postRouter.get('/timeline/:id',getFollowerPosts);

//get all post of user
postRouter.get('/user/all/:id',getUserPosts);
export default postRouter;