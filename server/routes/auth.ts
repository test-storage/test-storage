import * as jwt from 'jsonwebtoken';
import { secret } from './config/secret';

const auth = {

  login: function (req, res) {

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
    const dbUserObj = auth.validate(username, password);

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

  validate: function (username, password) {
    // spoofing the DB response for simplicity
    const dbUserObj = { // spoofing a userobject from the DB.
      name: 'admin',
      role: 'admin',
      username: 'admin@test-storage.local'
    };

    return dbUserObj;
  },

  validateUser: function (username) {
    // spoofing the DB response for simplicity
    const dbUserObj = { // spoofing a userobject from the DB.
      name: 'admin',
      role: 'admin',
      username: 'admin@test-storage.local'
    };

    return dbUserObj;
  },
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
