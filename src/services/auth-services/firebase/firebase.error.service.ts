import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseErrorService {
  private errorMappings = {
    'auth/argument-error': {
      message: 'Invalid token provided',
      httpStatus: HttpStatus.BAD_REQUEST,
    },
    'auth/id-token-expired': {
      message: 'Token expired please login again',
      httpStatus: HttpStatus.UNAUTHORIZED,
    },
    'auth/user-not-found': {
      message: 'User not found please sign up',
      httpStatus: HttpStatus.NOT_FOUND,
    },
    'auth/invalid-login-credentials': {
      message: 'Please check your email and password',
      httpStatus: 400,
    },
    'auth/too-many-requests': {
      message: 'Too many requests, please try again later.',
      httpStatus: HttpStatus.TOO_MANY_REQUESTS,
    },
    'auth/email-already-in-use': {
      message: 'Email already in use',
      httpStatus: HttpStatus.BAD_REQUEST,
    },
    'auth/invalid-email': {
      message: 'Invalid email address',
      httpStatus: HttpStatus.BAD_REQUEST,
    },
    'auth/wrong-password': {
      message: 'Invalid password',
      httpStatus: HttpStatus.BAD_REQUEST,
    },
    'auth/weak-password': {
      message: 'Password is too weak',
      httpStatus: HttpStatus.BAD_REQUEST,
    },
    'auth/invalid-verification-code': {
      message: 'Invalid verification code',
      httpStatus: HttpStatus.BAD_REQUEST,
    },
    'auth/invalid-verification-id': {
      message: 'Invalid verification id',
      httpStatus: HttpStatus.BAD_REQUEST,
    },
    // TODO: add more cases here if needed (https://firebase.google.com/docs/auth/admin/errors)
  };

  public handleFirebaseError(errorCode: string): HttpException {
    console.log(errorCode);

    const errorMapping = this.errorMappings[errorCode];
    if (errorMapping) {
      const { message, httpStatus } = errorMapping;
      return new HttpException(message, httpStatus);
    }
    return new HttpException('Internal server error', 500);
  }
}
