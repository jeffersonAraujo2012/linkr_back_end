import { editPostQuery } from "../repositories/editPost.repositorie.js";

export async function editPost(req, res) {

    const post = req.body

    try {
        const result = await editPostQuery(post);

        if (result === 0) return res.status(404).send('Escolha um post de sua autoria para editar.')

        res.sendStatus(200);

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}