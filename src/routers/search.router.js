import { Router } from "express"
import getMe from "../controller/getMe.js";
import { getUserById, getUserByName } from "../controller/search.controller.js";
import withAuth from "../middlewares/withAuth.js";

const searchRouter = Router();

searchRouter.get("/users/me", withAuth, getMe);
searchRouter.get("/users/:name", getUserByName);
searchRouter.get("/user/:id", getUserById);

export default searchRouter;