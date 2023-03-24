import createHashtag from "../repositories/createHashtag.repository.js";
import { deletePostQuery, editPostQuery, likePostQuery } from "../repositories/posts.repository.js";

export async function editPost(req, res) {

    const post = req.body
    const hashtagRegex = /#\S*/gm;
    let hashtags = post.description.match(hashtagRegex) || [];
    hashtags = hashtags.map((hashtag) => hashtag.slice(1));

  try {
    let resultCreateHashtags = await createHashtag(hashtags);
    const hashtagsId = resultCreateHashtags.map((hashtag) => hashtag.rows[0]);

    const result = await editPostQuery(post, hashtagsId);

        if (result === 0) return res.status(404).send('Escolha um post de sua autoria para editar.')

        res.sendStatus(200);

    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deletePost(req, res) {

    const post = req.body

    try {
        const result = await deletePostQuery(post);

        if (result === 0) return res.status(404).send('Vocẽ só pode deletar posts de sua autoria.')
        

        res.status(200).send('post deletado!');
    }
    catch (error) {
        res.status(500)
    }

}

export async function likePost(req, res) {

    const postAndUser = req.body
    console.log(postAndUser)
    try {
        const result = await likePostQuery(postAndUser);

        res.send({ ...result });
    }
    catch (error) {
        res.status(500).send(error.message)
    }

}