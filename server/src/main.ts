import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ApplicationModule } from './modules/app.module';
import { JwtAuthGuard } from './modules/common/guards/jwt.guard';

async function bootstrap() {

  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalGuards(new JwtAuthGuard())

  if (process.env.NODE_ENV !== 'production') {
    await initSwagger(app);
  }

  await app.listen(process.env.PORT || 3000);
}

function initSwagger(app) {
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

