import express from 'express';
import createPost from '../controller/createPost.controller.js';
import getPosts from '../controller/getPosts.controller.js';
import { deletePost, editPost } from '../controller/posts.controller.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import postSchema from '../schemas/post.schema.js';
const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.post('/', validateSchema(postSchema),createPost);
postsRouter.patch('/', editPost);
postsRouter.delete('/', deletePost);

export default postsRouter;