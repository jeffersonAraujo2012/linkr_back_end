import express from "express";
import getMetadataFromUrl from "../controllers/getMetadataFromUrl.controller.js";
const utilsRouter = express.Router();

utilsRouter.get('/urls/metadata', getMetadataFromUrl);

export default utilsRouter;