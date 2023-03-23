import { searchUserById, searchUserByName } from "../repositories/search.repository.js";

export async function getUserByName (req, res) {
    const { id, name } = req.params;

    try {
        const user = await searchUserByName(id, name);

        res.send(user.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getUserById (req, res) {
    const { id } = req.params;

    try {
        const user = await searchUserById(id);
        
        if (user.rowCount === 0) return res.status(404).send(`User doesn't exist`)

        res.send(user.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}