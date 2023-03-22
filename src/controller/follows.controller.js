import { follow, getFollowedById, unFollow } from "../repositories/follows.repository.js";

export async function getFollowed (req, res) {
    const { id } = req.params;

    try {
        const followed = await getFollowedById(id);

        res.send(followed.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
    return ;
}

export async function followUser (req, res) {
    const {followerId, followedId} = req.body;

    try {
        await follow(followerId, followedId);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function unFollowUser (req, res) {
    const {followerId, followedId} = req.params;

    try {
        await unFollow(followerId, followedId);

        res.sendStatus(202);
    } catch (error) {
        res.status(500).send(error.message);
    }
}