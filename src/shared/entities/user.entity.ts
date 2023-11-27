import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../interfaces';

export type UserDocument = User & Document;

@Schema()
export class User extends Document implements IUser {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, uppercase: true })
  name: string;

  @Prop({ required: true, uppercase: true })
  lastName: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, type: Date })
  updatedAt: Date;

  @Prop({ default: null })
  deletedAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
