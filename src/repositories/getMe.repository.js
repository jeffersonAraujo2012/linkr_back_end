import { db } from "../config/database.js";

export default async function getMeQuery(userId) {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0];
}
