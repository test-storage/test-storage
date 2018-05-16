import { Injectable, NestMiddleware } from '@nestjs/common';

const multer = require('multer');

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {

  resolve(): (req, res, next) => void {
    const upload = multer({ dest: './uploads/' });
    return upload.any();
  }
}
