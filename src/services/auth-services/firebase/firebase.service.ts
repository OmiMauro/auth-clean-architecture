import { initializeApp } from '@firebase/app';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin from 'firebase-admin';

import { Auth, getAuth } from '@firebase/auth';
import { getApps } from 'firebase-admin/app';

import firebaseSDK from 'firebase-sdk.json';
import { AuthProviderServices } from 'src/shared/abstracts';

@Injectable()
export class FirebaseService implements AuthProviderServices, OnApplicationBootstrap {
  private auth: Auth;
  private appName: string;
  private firebaseApiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.appName = this.configService.get('FIREBASE_APP_NAME');
    this.firebaseApiKey = this.configService.get('FIREBASE_API_KEY');
  }

  onApplicationBootstrap() {
    this.initializeFirebaseAdmin();
    this.initializeFirebaseClient();
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
}
