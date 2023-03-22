import { db } from "../config/database.js";

export async function getFollowedById (id) {
    const followed = await db.query(`
    SELECT followed_id FROM follows WHERE follower_id = $1;`, [id]);
    return followed;
}

export async function follow (followerId, followedId) {
    return await db.query(`
    INSERT INTO follows (follower_id, followed_id)
    VALUES ($1, $2);`, [followerId, followedId]);
}

export async function unFollow (followerId, followedId) {
    return await db.query(`
    DELETE FROM follows WHERE follower_id = $1
    AND followed_id = $2;`, [followerId, followedId]);
}