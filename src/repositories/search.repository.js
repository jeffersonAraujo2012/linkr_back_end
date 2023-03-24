import { db } from "../config/database.js";

export async function searchUserByName (id, name) {
    const user = await db.query(`
    SELECT u.picture_url, u.username, u.id
    FROM users u
    LEFT JOIN follows f ON u.id = f.followed_id AND f.follower_id = $1
    WHERE u.username LIKE $2
    ORDER BY CASE WHEN f.followed_id IS NOT NULL THEN 1 ELSE 2 END, u.username;`, [id,`${name}%`]);

    // SELECT users.picture_url, users.username, users.id
    // FROM users WHERE username LIKE $1;`, [`${name}%`]);

    return user;
}

export async function searchUserById (id) {
    const user = await db.query(`
        SELECT posts.*, users.username, users.picture_url AS picture_user
        FROM posts
        RIGHT JOIN users
        ON posts.user_id = users.id
	    WHERE users.id = $1
        ORDER BY created_at DESC
        LIMIT 20;`, [id]);

    return user;
}