import express from 'express';
import createPost from '../controller/createPost.controller.js';
import getPosts from '../controller/getPosts.controller.js';
import { editPost } from '../controller/editPosts.controller.js';
const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.post('/', createPost);
postsRouter.post('/edit', editPost)

export default postsRouter;