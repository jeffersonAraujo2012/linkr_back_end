import { db } from "../config/database.js";

export default async function createHashtag(hashtags) {
  const res = [];

  for (let i = 0; i < hashtags.length; i++) {
    res[i] = await db.query(
      `
    INSERT INTO hashtags (name) VALUES ($1) 
    ON CONFLICT (name) DO NOTHING`,
      [hashtags[i]]
    );
  }

  return res;
}
