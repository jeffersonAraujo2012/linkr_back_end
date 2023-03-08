import urlMetadata from "url-metadata";

export default async function getMetadataFromUrl(req, res) {
  const url = req.query.url;

  try {
    const data = await urlMetadata(url);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Internal Error");
  }
}
