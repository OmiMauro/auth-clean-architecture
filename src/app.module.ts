import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, UserModule } from './modules';
import { AuthProviderModule } from './services';
import { configuration } from './shared/config/configuration';
import { EMAIL_QUEUE } from './shared/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: AppModule.getEnvFilePath(),
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    AppModule.createDatabaseModule(),
    AuthProviderModule,
    AuthModule,
    UserModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: EMAIL_QUEUE,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  private static getEnvFilePath(): string {
    return process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
  }

  private static createDatabaseModule() {
    return MongooseModule.forRoot(process.env.MONGO_DB_URI);
  }
}
