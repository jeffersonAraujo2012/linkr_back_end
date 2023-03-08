import { Router } from "express"
import { getUserById, getUserByName } from "../controller/SearchUser.js";

const searchRouter = Router();

searchRouter.get("/users/:name", getUserByName);
searchRouter.get("/user/:id", getUserById);

export default searchRouter;