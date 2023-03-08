import { db } from "../config/database.js";

export async function getUserByName (req, res) {
    const { name } = req.params;

    try {
        const user = await db.query(`SELECT users.picture, users.username FROM users WHERE username LIKE $1;`, [`${name}%`]);

        res.send(user.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getUserById (req, res) {
    const { id } = req.params;

    try {
        const user = await db.query(`
        SELECT users.picture, users.username,
        json_agg(json_build_object(
            'id', posts.id,
            'url', posts.url,
            'description', posts.description,
            'like_count', posts.like_count)
        ORDER BY posts.id) AS posts
        FROM users LEFT JOIN posts ON users.id = posts.user_id
        WHERE users.id = $1
        GROUP BY users.picture, users.username;`, [id]);
        
        if (user.rowCount === 0) return res.status(404).send(`User doesn't exist`)

        res.send(user.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}