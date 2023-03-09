import { db } from "../config/database.js";

export async function searchUserByName (name) {
    const user = await db.query(`
    SELECT users.picture_url, users.username, users.id
    FROM users WHERE username LIKE $1;`, [`${name}%`]);

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