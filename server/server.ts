import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as compression from 'compression';

import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { NotFoundExceptionFilter } from './modules/common/filters/not-found-exception.filter';

import * as config from 'config';

const expressServer = express();
let server;

async function bootstrap() {

  const app = await NestFactory.create(ApplicationModule, expressServer);
  app.useGlobalFilters(new NotFoundExceptionFilter());
  if (config.get('app.enableGzipCompression') === true) {
    app.use(compression());
  }
  app.use(morgan('dev'));
  // Point static path to dist
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use('/i18n', express.static(path.join('./i18n')));
  await app.init();


  if (config.get('app.httpsEnabled') === false) {

    server = await http.createServer(expressServer).listen(3000);

  } else {

    const httpsOptions = {
      key: fs.readFileSync(config.get('https.privateKey'), 'utf8'),
      cert: fs.readFileSync(config.get('https.certificate'), 'utf8')
    };

    server = await https.createServer(httpsOptions, expressServer).listen(443);

  }
}
bootstrap();
export { server };
