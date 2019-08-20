import * as compression from 'compression';
import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {

  private static options: compression.CompressionOptions;

  public static configure(opts: compression.CompressionOptions) {
    this.options = opts;
  }

  resolve(...args: any[]) {
    return (req, res, next) => {
      if (CompressionMiddleware.options) {
        return compression(CompressionMiddleware.options);
      } else {
        return compression();
      }
    };
  }
}
