import { AuthResponse, Credentials } from '../types';

export abstract class AuthProviderServices {
  abstract createUser(credentials: Credentials): Promise<AuthResponse>;
  abstract signInWithEmail(credentials: Credentials): Promise<AuthResponse>;
}
