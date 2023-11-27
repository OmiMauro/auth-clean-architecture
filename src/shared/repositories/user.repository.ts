import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities';
import { IUserRepository } from '../interfaces';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(conditions: any): Promise<User | null> {
    const user = await this.userModel.findOne(conditions).exec();
    if (!user) return null;
    return user.toObject();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
  async findAll({ page, limit, ...filters }: any): Promise<User[]> {
    const users = await this.userModel
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return users.map((user) => user.toObject());
  }

  async create({ uid, email, name, lastName }: any): Promise<User | null> {
    const user = await this.userModel.create({
      uid,
      email,
      name,
      lastName,
    });
    if (!user) return null;
    if (Array.isArray(user) && user.length > 0) {
      return user[0].toObject() as User;
    }
    return user.toObject();
  }

  async updateById({ id, data }: { id: string; data }): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, { data }).exec();
  }
  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
