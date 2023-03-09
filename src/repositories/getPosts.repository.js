import { db } from "../config/database.js";

export async function getPostsQuery() {
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

export async function getPostsByHashtagQuery(hashtag) {
  const result = await db.query(
    `SELECT posts.*, users.username, users.picture_url AS picture_user
    FROM posts
    JOIN users
    ON posts.user_id = users.id
    WHERE posts.id IN (
      SELECT post_id FROM posts_hashtags 
      WHERE posts_hashtags.hashtag_id IN (
        SELECT id FROM hashtags WHERE name = $1
      ))
    ORDER BY created_at DESC
    LIMIT 20`,
    [hashtag]
  );
  if (result.rowCount === 0) {
    return [];
  }
  return result.rows;
}
