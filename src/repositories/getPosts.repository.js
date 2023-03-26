import { db } from "../config/database.js";

export async function getPostsQuery(id) {
  const result = await db.query(
    `SELECT posts.*, users.username, users.picture_url AS picture_user, COUNT(likes.id) AS likes_count,
    array_agg(CASE WHEN likes.post_id = posts.id THEN likes.user_id ELSE NULL END) AS liked_by
    FROM posts 
    LEFT JOIN users 
    ON users.id = posts.user_id
    LEFT JOIN likes
    ON likes.post_id = posts.id
    WHERE posts.user_id IN (
      SELECT followed_id FROM follows
      WHERE follows.follower_id = $1
    ) OR posts.user_id = $1
    GROUP BY (posts.id, users.username, users.picture_url)
    ORDER BY posts.created_at DESC
    LIMIT 20;    
    `, [id]);

  console.log(result.rows)
  if (result.rowCount === 0) {
    return [];
  }
  return result.rows;
}

export async function getPostsByHashtagQuery(hashtag) {
  const result = await db.query(
    `SELECT posts.*, users.username, users.picture_url AS picture_user, COUNT(likes.id) AS likes_count,
    array_agg(CASE WHEN likes.post_id = posts.id THEN likes.user_id ELSE NULL END) AS liked_by
    FROM posts 
    LEFT JOIN users 
    ON users.id = posts.user_id
    LEFT JOIN likes
    ON likes.post_id = posts.id
    WHERE posts.id IN (
      SELECT post_id FROM posts_hashtags 
      WHERE posts_hashtags.hashtag_id IN (
        SELECT id FROM hashtags WHERE name = $1
      ))
    GROUP BY (posts.id, users.username, users.picture_url)
    ORDER BY created_at DESC
    LIMIT 20`,
    [hashtag]
  );
  if (result.rowCount === 0) {
    return [];
  }
  return result.rows;
}
