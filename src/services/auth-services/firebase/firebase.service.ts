import { initializeApp } from '@firebase/app';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin from 'firebase-admin';

import {
  ActionCodeSettings,
  Auth,
  UserCredential,
  applyActionCode,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { getApps } from 'firebase-admin/app';

import firebaseSDK from 'firebase-sdk.json';
import { AuthProviderServices } from 'src/shared/abstracts';
import { AuthResponse } from 'src/shared/types';
import { FirebaseErrorService } from './firebase.error.service';

@Injectable()
export class FirebaseService implements AuthProviderServices, OnApplicationBootstrap {
  private auth: Auth;
  private appName: string;
  private firebaseApiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly firebaseErrorService: FirebaseErrorService,
  ) {
    this.appName = this.configService.get('FIREBASE_APP_NAME');
    this.firebaseApiKey = this.configService.get('FIREBASE_API_KEY');
    this.initializeFirebaseClient();
  }

  onApplicationBootstrap() {
    this.initializeFirebaseAdmin();
  }

  private initializeFirebaseAdmin() {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          privateKey: firebaseSDK.private_key,
          projectId: firebaseSDK.project_id,
          clientEmail: firebaseSDK.client_email,
        }),
      });
    }
  }

  private initializeFirebaseClient() {
    if (getApps().length === 0) {
      const app = initializeApp(
        {
          apiKey: this.firebaseApiKey,
          ...firebaseSDK,
        },
        this.appName,
      );
      this.auth = getAuth(app);
    }
  }

  getAuthService(): Auth {
    if (!this.auth) {
      throw new Error('Firebase Auth is not initialized');
    }
    return this.auth;
  }
  async createUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      const accessToken: string = await userCredential.user.getIdToken();

      return {
        user: userCredential.user,
        accessToken,
        refreshToken: userCredential.user.refreshToken,
      };
    } catch (error) {
      const httpError = this.firebaseErrorService.handleFirebaseError(error.code);
      throw httpError;
    }
  }
  async signInWithEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
    const accessToken: string = await userCredential.user.getIdToken();
    return {
      user: userCredential.user,
      accessToken,
      refreshToken: userCredential.user.refreshToken,
    };
  }
  async recoverPassword({ email }: { email: string }): Promise<string> {
    try {
      const link = await admin.auth().generatePasswordResetLink(email);
      return link;
    } catch (error) {
      const httpError = this.firebaseErrorService.handleFirebaseError(error.code);
      throw httpError;
    }
  }

  async verifyEmail({ code }: { code: string }): Promise<void> {
    try {
      await applyActionCode(this.auth, code);
    } catch (error) {
      const httpError = this.firebaseErrorService.handleFirebaseError(error.code);
      throw httpError;
    }
  }
  async resetPassword({ code, password }: { code: string; password: string }): Promise<void> {
    // TODO: implement this method
    console.log(code, password);
  }

  async createVerifyEmailLink({ email }: { email: string }): Promise<string> {
    const actionCodeSettings: ActionCodeSettings = {
      url: `${this.configService.get('URL_CLIENT')}/auth/verify-email`,
      handleCodeInApp: true,
    };
    const link = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);
    return link;
  }
}
