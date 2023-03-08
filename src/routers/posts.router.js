import express from 'express';
import createPost from '../controller/createPost.controller.js';
import getPosts from '../controller/getPosts.controller.js';
const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.post('/', createPost);

export default postsRouter;