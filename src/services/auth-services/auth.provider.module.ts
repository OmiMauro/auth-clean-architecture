import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthProviderServices } from 'src/shared/abstracts';
import { FirebaseErrorService } from './firebase/firebase.error.service';
import { FirebaseService } from './firebase/firebase.service';
@Module({
  imports: [ConfigModule],
  providers: [
    FirebaseService,
    FirebaseErrorService,
    {
      provide: AuthProviderServices,
      useClass: FirebaseService,
    },
  ],
  exports: [AuthProviderServices],
})
export class AuthProviderModule {}
