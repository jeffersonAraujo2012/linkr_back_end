import { Router } from "express"
import { followUser, getFollowed, unFollowUser } from "../controller/follows.controller.js";

const followsRouter = Router();

followsRouter.get("/follows/:id", getFollowed);
followsRouter.post("/follows", followUser);
followsRouter.delete("/follows/:followerId/:followedId", unFollowUser);

export default followsRouter;