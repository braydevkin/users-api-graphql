import * as fs from 'fs';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { CORS_WHITE_LIST, PORT } from './config/Constants';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const options = new DocumentBuilder()
    .setTitle('API With Mongoose')
    .setDescription('API With Mongoose')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync('./swagger-docs.json', JSON.stringify(document));
  SwaggerModule.setup('/docs', app, document);
  SwaggerModule.setup('/', app, document);


  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || CORS_WHITE_LIST.some((domain) => origin.includes(domain))) {
        callback(null, true);
      } else {
        console.warn(`CORS: Blocking from origin ${origin}`);
        callback(null, false);
      }
    },
    credentials: true,
  });

  console.log(`Server running on the port ${PORT}`);
  console.log(`The documentation is acessible in /docs`);
  console.log(`CORS configurado para aceitar requisições de: `);
  CORS_WHITE_LIST.forEach((origin) => {
    console.log(`- ${origin}`);
  });


  await app.listen(PORT);
}
bootstrap();
