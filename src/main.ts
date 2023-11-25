import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const URL_CLIENT = process.env.URL_CLIENT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: URL_CLIENT },
    rawBody: true,
  });

  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const PORT = config.get('PORT');
  const URL_API = config.get('URL_API');

  await app.listen(PORT, () => {
    Logger.log(`Server running on ${URL_API} in ${PORT} port`);
  });
}
bootstrap();
