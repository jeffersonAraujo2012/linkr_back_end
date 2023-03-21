
import axios from 'axios';
import jwt from 'jsonwebtoken';

const api = axios.create({
    baseURL: 'http://localhost:3000',
  });

export default async function withAuth(req, res, next) {
    const auth = req.headers?.authorization;
    
    if (!auth) {
      return res.status(401).send('You need to be logged in to access this page');
    }
  
    try {
      const token = auth.split(' ')[1];
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.user = decodedUser;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).send('Your session has expired. Please log in again');
      } else {
        return res.status(401).send('An error occurred while verifying the token. Please try again later');
      }
    }
  
}