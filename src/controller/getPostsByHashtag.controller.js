import { getPostsQuery } from "../repositories/getPosts.repository.js";

export default async function getPosts(req, res) {
  try {
    const posts = await getPostsQuery();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}