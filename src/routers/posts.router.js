import express from 'express';
import createPost from '../controller/createPost.controller.js';
import getPosts from '../controller/getPosts.controller.js';
import { deletePost, editPost, likePost } from '../controller/posts.controller.js';
const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.post('/', createPost);
postsRouter.patch('/', editPost);
postsRouter.delete('/', deletePost);
postsRouter.post('/like', likePost);

export default postsRouter;