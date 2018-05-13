import * as path from 'path';
import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.sendFile(path.join(__dirname, '../../../../../dist/index.html'));
  }
}
