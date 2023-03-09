import express from 'express';
import getHashtags from '../controller/getHashtags.controller.js';
const hashtagsRouter = express.Router();

hashtagsRouter.get('/', getHashtags);

export default hashtagsRouter;