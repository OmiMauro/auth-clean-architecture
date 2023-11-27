import { AuthResponse, Credentials } from '../types';

export abstract class AuthProviderServices {
  abstract createUser(credentials: Credentials): Promise<AuthResponse>;
  abstract signInWithEmail(credentials: Credentials): Promise<AuthResponse>;
  abstract recoverPassword({ email }: { email: string }): Promise<string>;
  abstract verifyEmail({ code }: { code: string }): Promise<void>;
  abstract resetPassword({ code, password }: { code: string; password: string }): Promise<void>;
  abstract createVerifyEmailLink({ email }: { email: string }): Promise<string>;
}
