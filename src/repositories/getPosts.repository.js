import { db } from "../config/database.js";

export async function getPostsQuery(id) {
  const result = await db.query(
    // `SELECT posts.*, users.username, users.picture_url AS picture_user
    // FROM posts
    // JOIN users
    // ON posts.user_id = users.id
    // ORDER BY created_at DESC
    // LIMIT 20`
    
    `SELECT posts.*, users.username, users.picture_url AS picture_user
    FROM posts
    JOIN follows f ON f.followed_id = posts.user_id AND f.follower_id = $1
    JOIN users ON posts.user_id = users.id
    ORDER BY created_at DESC
    LIMIT 20;`, [id]
    
    //`SELECT 
    //posts.*, 
    //users.username, 
    //users.picture_url AS picture_user, 
    //COUNT(likes.id) AS likes_count, 
    //array_agg(liked_users.id) AS liked_by
  //FROM 
    //posts
    //JOIN users ON posts.user_id = users.id
    //LEFT JOIN likes ON posts.id = likes.post_id
    //LEFT JOIN (
      //SELECT 
        //likes.post_id, 
        //users.id 
      //FROM 
        //likes 
        //JOIN users ON likes.user_id = users.id
   //) liked_users ON posts.id = liked_users.post_id
  //GROUP BY 
    //posts.id, 
    //users.username, 
    //users.id, 
    //picture_user
  //ORDER BY 
    //posts.created_at DESC
  //LIMIT 20;  
    //`
  );
  console.log(result.rows)
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
