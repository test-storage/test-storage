import * as mongoose from 'mongoose';
import { User } from '../models/User';
import { RefreshToken } from '../models/RefreshToken';

import * as jwt from 'jsonwebtoken';
import { secret } from './config/secret';
import * as bcrypt from 'bcrypt';

class Auth {

  async login(req, res) {

    // TODO proper response with request without content-type

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

    // Fire a query to DB and check if the credentials are valid
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

  async refresh(req, res) {

    const token = (req.body && req.body.refresh_token) || (req.query && req.query.refresh_token) || req.headers['x-refresh-token'];

    if (token) {
      try {
        const decoded = await jwt.verify(token, secret(), { algorithm: 'HS256' });

        if (decoded.exp <= Math.floor(Date.now() / 1000)) {
          res.status(401);
          res.json({
            'status': 401,
            'message': 'Refresh Token Expired'
          });
          return;
        }

        // Authorize the user to see if s/he can access resources
        const dbUser = await this.validateUser(decoded.username); // The db user would be the logged in user's username

        if (!dbUser) {
          // No user with this name exists, respond back with a 401
          res.status(401);
          res.json({
            'status': 401,
            'message': 'Invalid User'
          });
          return;
        }

        if (dbUser) {
          const validRefreshToken = await this.isRefreshTokenValid(decoded.userId, token);
          if (validRefreshToken) {
            // If authentication is success, we will generate a token
            // and dispatch it to the client

            await res.json(await this.genToken(dbUser));
          } else {
            // No user with this name exists, respond back with a 401
            res.status(401);
            res.json({
              'status': 401,
              'message': 'Invalid Refresh Token'
            });
            return;
          }
        }

      } catch (err) {
        res.status(500);
        res.json({
          'status': 500,
          'message': 'Oops something went wrong',
          'error': '' + err
        });

      }
    } else {
      res.status(401);
      res.json({
        'status': 401,
        'message': 'Invalid Token'
      });
      return;
    }
  }


  async validate(username, password) {

    const fields = { 'updated': 0, 'created': 0 };

    const user = await User.find({ 'email': username }, fields).limit(1);

    if (user.length > 0) {
      // compare password with hash
      const passwordIsMatch = await bcrypt.compareSync(password, user[0].password);

      if (passwordIsMatch) {
        user[0].password = undefined;
        return user[0];
      }
    } else {
      console.log('User not found!');
      return null;
    }

  }

  // Method to compare password for login
  async comparePassword(password, hash, cb) {
    await bcrypt.compare(password, hash, (err, isMatch) => {
      if (err) { return cb(err); }
      cb(null, isMatch);
    });
  }



  async validateUser(username) {
    const fields = { 'password': 0, 'updated': 0, 'created': 0 };

    const user = await User.find({ 'email': username }, fields).limit(1);

    if (user.length > 0) {
      return user[0];
    } else {
      console.log('User not found!');
      return;
    }
  }

  async isRefreshTokenValid(userId, token): Promise<boolean> {
    const refreshToken = await RefreshToken.find({ 'userId': userId }).limit(1);

    if (refreshToken.length > 0) {
      // compare tokens
      if (token.token === refreshToken.token) {
        return true;
      } else {
        console.log('Refresh tokens not match!');
        return false;
      }
    } else {
      console.log('Refresh token not found!');
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
    // const expires = await this.expiresIn(1); // 1 days

    const accessToken = await jwt.sign({ username: user.email, userId: user._id }, secret(), { expiresIn: '1m' });
    const refreshToken = await jwt.sign({ username: user.email, userId: user._id }, secret(), { expiresIn: '60d' });

    await RefreshToken.update({ 'userId': user._id }, { 'token': refreshToken }, { upsert: true });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user
      // expires: expires, // TODO Proper date
    };
  }

  private expiresIn(numDays) {
    const dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
  }

}
export { Auth };
