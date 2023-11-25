type Credentials = {
  email: string;
  password: string;
};

export abstract class AuthProviderServices {
  abstract createUserWithEmailAndPassword(credentials: Credentials): Promise<any>;
  abstract signInWithEmailAndPassword(credentials: Credentials): Promise<any>;
}
