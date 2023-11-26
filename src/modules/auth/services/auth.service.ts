import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthProviderServices } from 'src/shared/abstracts/auth.interface';
import * as dto from 'src/shared/dtos';
import { User } from 'src/shared/entities';
import { UserRepository } from 'src/shared/repositories';
@Injectable()
export class AuthService {
  constructor(
    private readonly authProviderService: AuthProviderServices,
    private readonly userRepository: UserRepository,
  ) {}

  async signUp({ body }: { body: dto.CreateUserDTO }): Promise<any> {
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
}
