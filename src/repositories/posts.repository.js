import { db } from "../config/database.js";

export async function editPostQuery(post, hashtagsId) {
    const postUser = await db.query(
        `SELECT * FROM posts
         WHERE id = $1 AND user_id = $2`,
          [post.id, post.user_id]);

    if (postUser.rowCount === 0) return 0

    const result = await db.query(`UPDATE posts SET description = $1 WHERE id=$2`, [post.description, post.id])

    for (let i = 0; i < hashtagsId.length; i++) {
        await db.query(
          `INSERT INTO posts_hashtags (post_id, hashtag_id) VALUES ($1, $2)`,
          [post.id, hashtagsId[i].id]
        );
      }

    return result
}

export async function deletePostQuery(post) {    
    const postUser = await db.query(
        `SELECT * FROM posts
         WHERE id = $1 AND user_id = $2`,
          [post.id, post.user_id]);
        
    if (postUser.rowCount === 0) return 0

    try {
        await db.query('BEGIN');
        await db.query('DELETE FROM posts_hashtags WHERE post_id = $1', [post.id]);
        await db.query('DELETE FROM likes WHERE post_id = $1', [post.id]);
        await db.query('DELETE FROM posts WHERE id = $1', [post.id]);
        await db.query('COMMIT');

        return
      }
      catch (err) {
        await db.query('ROLLBACK');
        console.error(err);
      }
}

export async function likePostQuery(postAndUser) {
        const like = await db.query(
            `SELECT * FROM likes
             WHERE post_id = $1 AND user_id = $2`,
             [postAndUser.id, postAndUser.user]);

        if (like.rowCount === 1) {
            const removeLike = await db.query(
                `DELETE FROM likes WHERE user_id = $1 AND post_id = $2`,
                 [postAndUser.user, postAndUser.id]);
            
            const quantLike = await db.query(`SELECT count(*) FROM likes WHERE post_id = $1`, [postAndUser.id])
            console.log(quantLike.rows)
            return quantLike.rows[0]
        }

        const updateLikes = await db.query(`INSERT INTO likes (user_id, post_id) VALUES ($1, $2)`, [postAndUser.user, postAndUser.id])

        const quantLike = await db.query(`SELECT count(*) FROM likes WHERE post_id = $1`, [postAndUser.id])

        return quantLike.rows[0]
}

export async function repostQuery(postAndUser) {

  const post = await db.query(`
      SELECT * FROM reposts WHERE post_id = $1 AND user_id = $2`,
      [postAndUser.id, postAndUser.user]);

  if  (post.rowCount > 0) return 0

  await db.query(`INSERT INTO reposts (post_id, user_id)
                  VALUES ($1, $2)`,
                  [postAndUser.id, postAndUser.user]);

  return
}