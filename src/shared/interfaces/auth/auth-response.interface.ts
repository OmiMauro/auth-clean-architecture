import { User } from 'src/shared/entities';

export type IAuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
