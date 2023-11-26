export interface IUser {
  _id?: string;
  uid: string;
  email: string;
  password?: string;
  name: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
