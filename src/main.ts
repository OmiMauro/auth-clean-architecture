import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './shared/interceptors';
import { CustomValidationPipe } from './shared/pipes';

async function bootstrap() {
  const URL_CLIENT = process.env.URL_CLIENT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: URL_CLIENT },
    rawBody: true,
  });

  const config = app.get(ConfigService);

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('/api/v1');

  const PORT = config.get('PORT');
  const URL_API = config.get('URL_API');

  await app.listen(PORT, () => {
    Logger.log(`Server running on ${URL_API} in ${PORT} port`);
  });
}
bootstrap();
