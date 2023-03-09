import { db } from "../config/database.js";

export default async function createPostQuery(post, hashtagsId) {
  const p = await db.query(
    `INSERT INTO posts (url, description, user_id) VALUES ($1, $2, $3)
     RETURNING id`,
    [post.url, post.description, post.userId]
  );

  for (let i = 0; i < hashtagsId.length; i++) {
    await db.query(
      `INSERT INTO posts_hashtags (post_id, hashtag_id) VALUES ($1, $2)`,
      [p.rows[0].id, hashtagsId[i].id]
    );
  }

  return p;
}
