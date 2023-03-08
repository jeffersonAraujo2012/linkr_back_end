import { db } from "../config/database.js";

export default async function getPostsQuery() {
  const result = await db.query(
    `SELECT posts.*, users.username, users.picture_url AS picture_user
    FROM posts
    JOIN users
    ON posts.user_id = users.id
    ORDER BY created_at DESC
    LIMIT 20`
  );
  if (result.rowCount === 0) {
    return [];
  }
  return result.rows;
}
