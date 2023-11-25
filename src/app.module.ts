import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthProviderModule } from './services';
import { configuration } from './shared/config/configuration';

const envFilePath: string = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    AuthProviderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
