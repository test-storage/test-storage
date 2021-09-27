import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CORSMiddleware implements NestMiddleware {

  use(req, res, next) {
    // CORS headers
    res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  }
}
