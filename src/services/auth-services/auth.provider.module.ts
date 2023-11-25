import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthProviderServices } from 'src/shared/abstracts';
import { FirebaseService } from './firebase/firebase.service';
@Module({
  imports: [ConfigModule],
  providers: [
    FirebaseService,
    {
      provide: AuthProviderServices,
      useClass: FirebaseService,
    },
  ],
  exports: [AuthProviderServices],
})
export class AuthProviderModule {}
