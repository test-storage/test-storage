import * as mongoose from 'mongoose';
import { User } from '../models/User';

import * as jwt from 'jsonwebtoken';
import { secret } from './config/secret';
import * as bcrypt from 'bcrypt';

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

    const fields = { 'updated': 0, 'created': 0 };

    const user = await User.find({ 'email': username }, fields).limit(1);


    if (user.length > 0) {
      // compare password with hash
      console.log(password);
      console.log(user[0].password);
      await this.comparePassword(password, user[0].password, function (err, isMatch) {
        if (err) {
          throw err;
        } else {

          user[0].password = undefined;
          return user;
        }
      });
    } else {
      console.log('User not found!');
      return null;
    }

  }

  // Method to compare password for login
  async comparePassword(candidatePassword, actualPassword, cb) {
    bcrypt.compare(candidatePassword, actualPassword, (err, isMatch) => {
      if (err) { return cb(err); }

      cb(null, isMatch);
    });
  };



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
  private async genToken(user) {
    const expires = await this.expiresIn(1); // 1 days
    const token = jwt.sign({
      // exp: expires,
      username: user[0].email,
      userId: user[0]._id
    }, secret(), { expiresIn: '1d' });

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
