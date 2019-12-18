import * as fs from 'fs';
import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as compression from 'compression';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ApplicationModule } from './modules/app.module';
import { NotFoundExceptionFilter } from './modules/common/filters/not-found-exception.filter';

import * as config from 'config';

import { ExpressAdapter } from '@nestjs/platform-express';

const expressServer = express();
let app;

async function bootstrap() {

  expressServer.disable('x-powered-by');

  app = await NestFactory.create(ApplicationModule, new ExpressAdapter(expressServer), {});
  const port: number = config.get('http.port');

  setMiddlewares();

  if (process.env.NODE_ENV !== 'production') {
    await initSwagger();
  }

  await app.listen(process.env.PORT || port || 3000);
}

async function setMiddlewares() {

  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.use(morgan('dev'));

  // Point static path to dist
  app.use(express.static(path.join(__dirname, '../../dist/test-storage')));
  app.use('/i18n', express.static(path.join('./i18n')));

}

function initSwagger() {
  const options = new DocumentBuilder()
    .setTitle('Test Storage API')
    .setDescription('The Test Storage API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/apidocs', app, document);
}

bootstrap();
