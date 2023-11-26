import { User } from '../../entities/user.entity';

export interface IUserRepository {
  findOne(conditions: any): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll({ page, limit, ...filters }: any): Promise<User[]>;
  create({
    uid,
    email,
    name,
    lastName,
  }: {
    uid: string;
    email: string;
    name: string;
    lastName: string;
  }): Promise<User | null>;
  updateById({ id, data }: { id: string; data }): Promise<User | null>;
  delete(id: string): Promise<User | null>;
}
