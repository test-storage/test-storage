import * as mongoose from 'mongoose';
import { User } from '../models/User';

import * as jwt from 'jsonwebtoken';
import { secret } from './config/secret';

const auth = {

  login: async function (req, res) {

    const username = req.body.username || '';
    const password = req.body.password || '';

    if (username === '' || password === '') {
      res.status(401);
      res.json({
        'status': 401,
        'message': 'Invalid credentials'
      });
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    const dbUserObj = await auth.validate(username, password);

    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        'status': 401,
        'message': 'Invalid credentials'
      });
      return;
    }

    if (dbUserObj) {

      // If authentication is success, we will generate a token
      // and dispatch it to the client

      res.json(genToken(dbUserObj));
    }

  },

  validate: async function (username, password) {
    const fields = { 'password': 0, 'updated': 0, 'created': 0 };

    const user = await User.find({ 'email': username, 'password': password }, fields).limit(1);
    if (user.length > 0) {
      return user;
    } else {
      console.log('User not found!');
      return;
    }
  },

  validateUser: async function (username) {
    const fields = { 'password': 0, 'updated': 0, 'created': 0 };
    const user = await User.find({ 'email': username }, fields).limit(1);
    if (user.length > 0) {
      return user;
    } else {
      return;
    }
  }
}

// private method
function genToken(user) {
  const expires = expiresIn(1); // 1 days
  const token = jwt.sign({
    exp: expires
  }, secret());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  const dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

export { auth }
