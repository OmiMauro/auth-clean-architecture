export type AuthResponse = {
  user: unknown;
  accessToken: string;
  refreshToken: string;
};

export type Credentials = {
  email: string;
  password: string;
};
