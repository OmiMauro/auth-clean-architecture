// src/shared/database/database.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities';
import { UserRepository } from '../repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      // Add other models here as needed
    ]),
  ],
  providers: [UserRepository],
  exports: [MongooseModule, UserRepository],
})
export class DatabaseModule {}
