import { getPostsByHashtagQuery } from "../repositories/getPosts.repository.js";

export default async function getPostsByHashtag(req, res) {
  const {hashtag} = req.params;

  try {
    const posts = await getPostsByHashtagQuery(hashtag);
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}