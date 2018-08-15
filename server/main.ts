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

const expressServer = express();
let app;
let port;

async function bootstrap() {

  expressServer.disable('x-powered-by');

  if (config.get('app.httpsEnabled') === false) {
    app = await NestFactory.create(ApplicationModule, expressServer, {});
    port = config.get('http.port');
  } else {
    const httpsOptions = {
      key: fs.readFileSync(config.get('https.privateKey'), 'utf8'),
      cert: fs.readFileSync(config.get('https.certificate'), 'utf8')
    };
    app = await NestFactory.create(ApplicationModule, expressServer, { httpsOptions: httpsOptions });
    port = config.get('https.port');
  }

  setMiddlewares();

  if (process.env.NODE_ENV !== 'production') {
    await initSwagger();
  }

  await app.listen(process.env.PORT || port || 3000);
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
