import { db } from "../config/database.js";

export async function editPostQuery(post) {
    const postUser = await db.query(
        `SELECT * FROM posts
         WHERE id = $1 AND user_id = $2`,
          [post.id, post.user_id]);

    if (postUser.rowCount === 0) return 0

    const result = await db.query(`UPDATE posts SET description = $1 WHERE id=$2`, [post.description, post.id])

    return result
}

export async function deletePostQuery(post) {
    const postUser = await db.query(
        `SELECT * FROM posts
         WHERE id = $1 AND user_id = $2`,
          [post.id, post.user_id]);

    if (postUser.rowCount === 0) return 0

    const result = await db.query(`DELETE FROM posts WHERE id=$1`, [post.id])

    return result
}