import createHashtag from "../repositories/createHashtag.repository.js";
import createPostQuery from "../repositories/createPost.repository.js";

export default async function createPost(req, res) {
  const post = req.body;
  const hashtagRegex = /#\S*/gm;
  let hashtags = post.description.match(hashtagRegex);
  hashtags = hashtags.map(hashtag => hashtag.slice(1));

  try {
    await createHashtag(hashtags);
    const result = await createPostQuery(post);
    if (result.rowCount === 1) res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
