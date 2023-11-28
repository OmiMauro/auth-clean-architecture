import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AuthProviderModule } from 'src/services';
import { EMAIL_QUEUE } from 'src/shared/constants';
import { DatabaseModule } from 'src/shared/database/database.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [AuthProviderModule, DatabaseModule, BullModule.registerQueue({ name: EMAIL_QUEUE })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
