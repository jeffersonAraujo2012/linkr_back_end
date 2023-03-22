import getMeQuery from "../repositories/getMe.repository.js";

export default async function getMe(req, res) {
  const userId = res.locals.userId;
  try {
    const me = await getMeQuery(userId);
    if (!me) {
      res.status(404).send("User Not Found");
    }
    res.status(200).send(me);
  } catch (error) {
    res.status(500).send("Internal error at me data request");
  }
}
