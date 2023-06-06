import express from 'express';
import { verifyToken } from '../verify.js';
import {
    createPost,
    deletePost,
    likeOrDislike,
    getExplorePosts,
    getFollowerPosts,
    getUserPosts,
    getComment ,
    getReviewPosts,
    donePost
    
} from "../controllers/postController.js"
const postRouter=express.Router();

//create post
// postRouter.post('/',verifyToken, createPost);
postRouter.post('/',createPost);

//delete post
// postRouter.delete('/:id',verifyToken, deletePost);
postRouter.delete('/delete/', deletePost);

postRouter.put('/done/', donePost);
//Like or Dislike a post
postRouter.post('/:id/like',likeOrDislike);

postRouter.post('/:id/comment',getComment);

//get all  posts
postRouter.get('/explore',getExplorePosts);

//get all user followers posts
postRouter.get('/timeline/:id',getFollowerPosts);

//get all post of user
postRouter.get('/user/all/:id',getUserPosts);

//get all post of user
postRouter.get('/review',getReviewPosts);


export default postRouter;