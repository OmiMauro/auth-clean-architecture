import { Module } from '@nestjs/common';
import { AuthProviderModule } from 'src/services';
import { DatabaseModule } from 'src/shared/database/database.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [AuthProviderModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
