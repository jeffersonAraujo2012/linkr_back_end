import createPostQuery from "../repositories/createPost.repository.js";

export default async function createPost(req, res){
  const post = req.body;

  try {
    const result = await createPostQuery(post);
    if (result.rowCount === 1) res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}