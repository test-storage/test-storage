import { HttpException, Injectable, PipeTransform, ArgumentMetadata, HttpStatus } from '@nestjs/common';

@Injectable()
export class QueryIdValidationPipe implements PipeTransform<string> {

  async transform(value: string, metadata: ArgumentMetadata) {
    if (value === undefined) {
      return;
    }
    if (!value.match('^[a-f0-9]{32}$')) {
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
