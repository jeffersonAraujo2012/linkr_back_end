import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import { db } from '../config/database.js';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

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
  const authToken = uuidV4();

  try {
    const existe = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    if (existe.rowCount === 0) return res.sendStatus(401);

    const { id, password: hash } = existe.rows[0];
    const senhaCorreta = bcrypt.compareSync(password, hash);
    if (!senhaCorreta) return res.sendStatus(401);

    await db.query('INSERT INTO sessions ("userToken", "userId") VALUES ($1, $2)', [authToken, existe.rows[0].id]);

    return res.status(200).send({ token: authToken });
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

export async function withAuth(handler) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('You need to be logged in to access this page');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await api.get(`/users/${decoded.id}`);
    return handler({ ...user.data, token });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Your session has expired. Please log in again');
    } else {
      throw new Error('An error occurred while verifying the token. Please try again later');
    }
  }
}

export function signOut() {
  localStorage.removeItem('token');
  window.location.reload();
}
