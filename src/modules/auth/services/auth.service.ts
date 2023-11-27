import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthProviderServices } from 'src/shared/abstracts/auth.interface';
import * as dto from 'src/shared/dtos';
import { User } from 'src/shared/entities';
import { IAuthResponse } from 'src/shared/interfaces';
import { UserRepository } from 'src/shared/repositories';
@Injectable()
export class AuthService {
  constructor(
    private readonly authProviderService: AuthProviderServices,
    private readonly userRepository: UserRepository,
  ) {}

  async signUp({ body }: { body: dto.CreateUserDTO }): Promise<IAuthResponse> {
    const { email, password, name, lastName } = body;
    try {
      const existUser: User | null = await this.userRepository.findOne({ email });
      if (existUser) {
        throw new BadRequestException('The user already exists');
      }
      const { user, accessToken, refreshToken } = await this.authProviderService.createUser({
        email,
        password,
      });

      const newUser = await this.userRepository.create({
        uid: user.uid,
        email,
        name,
        lastName,
      });
      return { user: newUser, accessToken, refreshToken };
    } catch (error) {
      Logger.error(error, 'AuthService.signUp --- Error creating user');
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async signIn({ body }: { body: dto.SignInDTO }): Promise<IAuthResponse> {
    const { email, password } = body;
    try {
      const existUser: User | null = await this.userRepository.findOne({ email });

      if (!existUser) {
        throw new BadRequestException('The user does not exist');
      }
      const { accessToken, refreshToken } = await this.authProviderService.signInWithEmail({
        email,
        password,
      });

      return { user: existUser, accessToken, refreshToken };
    } catch (error) {
      Logger.error(error, 'AuthService.signIn --- Error signing in');
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async recoverPassword({ body }: { body: dto.RecoverPasswordDTO }): Promise<string> {
    try {
      const { email } = body;
      const user = await this.userRepository.findOne({ email });
      if (!user) {
        throw new BadRequestException('The user does not exist');
      }
      return await this.authProviderService.recoverPassword({ email });
    } catch (error) {
      Logger.error(error, 'AuthService.recoverPassword --- Error recovering password');
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyEmail({ body }: { body: dto.VerifyEmailDTO }): Promise<void> {
    const { code } = body;
    try {
      await this.authProviderService.verifyEmail({ code });
    } catch (error) {
      Logger.error(error, 'AuthService.verifyEmail --- Error verifying email');
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async resetPassword({ body }: { body: dto.ResetPasswordDTO }): Promise<void> {
    const { code, password } = body;
    try {
      await this.authProviderService.resetPassword({ code, password });
    } catch (error) {
      Logger.error(error, 'AuthService.resetPassword --- Error resetting password');
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createVerifyEmailLink({ email }: { email: string }): Promise<string> {
    try {
      return await this.authProviderService.createVerifyEmailLink({ email });
    } catch (error) {
      Logger.error(error, 'AuthService.createVerifyEmailLink --- Error creating verify email link');
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
