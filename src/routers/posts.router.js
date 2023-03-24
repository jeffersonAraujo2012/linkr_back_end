import express from "express";
import createPost from "../controller/createPost.controller.js";
import getPosts from "../controller/getPosts.controller.js";
import getPostsByHashtag from "../controller/getPostsByHashtag.controller.js";
import {
  deletePost,
  editPost,
  likePost,
} from "../controller/posts.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import postSchema from "../schemas/post.schema.js";
const postsRouter = express.Router();

postsRouter.get("/:id", getPosts);
postsRouter.get("/hashtag/:hashtag", getPostsByHashtag);
postsRouter.post("/", validateSchema(postSchema), createPost);
postsRouter.patch("/", editPost);
postsRouter.delete("/", deletePost);
postsRouter.post("/like", likePost);

export default postsRouter;
