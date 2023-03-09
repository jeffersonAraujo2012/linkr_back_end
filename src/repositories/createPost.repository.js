import { db } from "../config/database.js";

export default async function createPostQuery(post) {
  const p = await db.query(
    `INSERT INTO posts (url, description, user_id) VALUES ($1, $2, $3)`,
    [post.url, post.description, post.userId]
  );

  return p
}
