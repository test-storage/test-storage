import * as mongoose from 'mongoose';
import { User } from '../models/User';

import * as jwt from 'jsonwebtoken';
import { secret } from './config/secret';

class Auth {

  async login(req, res) {

    const username: string = req.body.username || '';
    const password: string = req.body.password || '';

    if (username === '' || password === '') {
      res.status(401);
      res.json({
        'status': 401,
        'message': 'Invalid credentials'
      });
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    const dbUserObj: object = await this.validate(username, password);

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

      await res.json(await this.genToken(dbUserObj));
    }

  }

  async validate(username, password) {

    const fields = { 'password': 0, 'updated': 0, 'created': 0 };

    const user = await User.find({ 'email': username, 'password': password }, fields).limit(1);

    if (user.length > 0) {
      return user;
    } else {
      console.log('User not found!');
      return;
    }

  }




  async validateUser(username) {
    const fields = { 'password': 0, 'updated': 0, 'created': 0 };

    const user = await User.find({ 'email': username }, fields).limit(1);

    if (user.length > 0) {
      return user;
    } else {
      console.log('User not found!');
      return;
    }
  }

  getUserId(req, res): string {

    const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (token) {
      try {
        const decoded = jwt.decode(token, secret(), { algorithm: 'HS256' });
        return decoded.userId;
      } catch (err) {
        res.status(500);
        res.json({
          'status': 500,
          'message': 'Oops something went wrong',
          'error': '' + err
        });
      }
    }
  }

  // private method
  private genToken(user) {
    const expires = this.expiresIn(1); // 1 days
    const token = jwt.sign({
      exp: expires,
      username: user[0].email,
      userId: user[0]._id
    }, secret());

    return {
      token: token,
      expires: expires,
      user: user
    };
  }

  private expiresIn(numDays) {
    const dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
  }

}
export { Auth }
