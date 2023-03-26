import urlMetadata from "url-metadata";

export default async function getMetadataFromUrl(req, res) {
  let url = req.query.url;
  if (url[url.length - 1] === '/') {
    url = url.slice(0,-1);
  }

  try {
    const data = await urlMetadata(url, {timeout: 60000});
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}
