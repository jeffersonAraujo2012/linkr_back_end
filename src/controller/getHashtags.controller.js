import getHashtagsQuery from "../repositories/getHashtags.repository.js";

export default async function getHashtags(req, res) {
  try {
    const hashtags = await getHashtagsQuery();
    res.status(200).send(hashtags.rows);
  } catch (error) {
    res.status(500).send('Internal Error: ' + error.message);
  }
}
