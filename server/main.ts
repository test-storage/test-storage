import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as compression from 'compression';

import { NestFactory } from '@nestjs/core';
import { HttpsOptions } from '@nestjs/common/interfaces/https-options.interface';
import { ApplicationModule } from './modules/app.module';
import { NotFoundExceptionFilter } from './modules/common/filters/not-found-exception.filter';

import * as config from 'config';

const expressServer = express();
let app;

async function bootstrap() {

  if (config.get('app.httpsEnabled') === false) {
    app = await NestFactory.create(ApplicationModule, expressServer);
  } else {
    const httpsOptions: HttpsOptions = {
      key: fs.readFileSync(config.get('https.privateKey'), 'utf8'),
      cert: fs.readFileSync(config.get('https.certificate'), 'utf8')
    };
    app = await NestFactory.create(ApplicationModule, expressServer, httpsOptions);
  }

  setMiddlewares();

  await app.init();

}

async function setMiddlewares() {

  app.useGlobalFilters(new NotFoundExceptionFilter());

  if (config.get('app.enableGzipCompression') === true) {
    app.use(compression());
  }

  app.use(morgan('dev'));

  // Point static path to dist
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use('/i18n', express.static(path.join('./i18n')));

}

bootstrap();
