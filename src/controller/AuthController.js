import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import { db } from '../config/database.js';

export async function signUp(req, res) {
  const { username, email, password, picture_url } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    const checkUser = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    if (checkUser.rowCount > 0) return res.sendStatus(409);

    await db.query('INSERT INTO users (username, email, password, picture_url) VALUES ($1, $2, $3, $4);', [username, email, hashPassword, picture_url]);

    return res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const existe = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    if (existe.rowCount === 0) return res.sendStatus(401);

    const { password: hash } = existe.rows[0];
    const senhaCorreta = bcrypt.compareSync(password, hash);
    if (!senhaCorreta) return res.sendStatus(401);

    const userData = existe.rows[0];
    delete userData.password;

    const token = jwt.sign(userData, process.env.JWT_SECRET);

    return res.status(200).send({ token: token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getPosts() {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while loading the posts. Please try again later');
  }
}
