import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/AuthRouter.js";
import searchRouter from "./routers/search.router.js";
import utilsRouter from "./routers/utils.router.js";
import postsRouter from "./routers/posts.router.js";
import hashtagsRouter from "./routers/hashtags.router.js";
import followsRouter from "./routers/follows.router.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use([authRouter, searchRouter]);
app.use([authRouter, searchRouter, followsRouter]);
app.use("/utils", utilsRouter);
app.use("/posts", postsRouter);
app.use("/hashtags", hashtagsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor iniciou na porta ${port}!!`);
});
