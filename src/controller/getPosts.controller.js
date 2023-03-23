import { getPostsQuery } from "../repositories/getPosts.repository.js";

export default async function getPosts(req, res) {
  const { id } = req.params;
  try {
    const posts = await getPostsQuery(id);
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}