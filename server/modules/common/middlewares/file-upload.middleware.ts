import { Middleware } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common/interfaces/middlewares';
const multer = require('multer');

@Middleware()
export class FileUploadMiddleware implements NestMiddleware {
  resolve(): (req, res, next) => void {
    const upload = multer({ dest: './uploads/' });
    return upload.any();
  }
}
