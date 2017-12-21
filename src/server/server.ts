import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';

import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { NotFoundExceptionFilter } from './modules/common/filters/not-found-exception.filter';

import * as config from 'config';

const server = express();

async function bootstrap() {

  const app = await NestFactory.create(ApplicationModule, server);
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.use(morgan('dev'));
  // Point static path to dist
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use('/i18n', express.static(path.join('./i18n')));
  await app.init();


  if (config.get('app.httpsEnabled') === false) {

    http.createServer(server).listen(3000);

  } else {

    const httpsOptions = {
      key: fs.readFileSync(config.get('https.privateKey'), 'utf8'),
      cert: fs.readFileSync(config.get('https.certificate'), 'utf8')
    };

    https.createServer(httpsOptions, server).listen(443);

  }
}
bootstrap();
