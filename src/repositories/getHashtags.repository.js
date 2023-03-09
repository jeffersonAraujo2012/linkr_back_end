import { db } from "../config/database.js";

export default async function getHashtagsQuery(){
  return await db.query("SELECT * FROM hashtags");
}