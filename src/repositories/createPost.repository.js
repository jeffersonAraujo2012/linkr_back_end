import { db } from "../config/database.js";

export default async function createPostQuery(post) {
  await db.query(
    `INSERT INTO posts (url, description, user_id) VALUES ($1, $2, $3)`,
    [post.picture_url, post.description, post.user_id]
  );
}
