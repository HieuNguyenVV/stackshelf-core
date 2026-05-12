import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfiguration } from './config/configurations';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(AppConfiguration);
  // Global prefix
  app.setGlobalPrefix(`${appConfig.apiPrefix}/${appConfig.apiVersion}`);

   // Global pipes
   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

   // Enable CORS
   app.enableCors({
    origin: process.env.CORS_ALLOWED_ORIGINS
      ? process.env.CORS_ALLOWED_ORIGINS.split(',')
      : [],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
    ],
  });

  await app.listen(appConfig.port);
}
bootstrap();
