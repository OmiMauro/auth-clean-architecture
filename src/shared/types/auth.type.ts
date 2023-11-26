import { User } from 'firebase/auth';
export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type Credentials = {
  email: string;
  password: string;
};
