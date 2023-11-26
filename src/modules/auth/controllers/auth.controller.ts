import { Body, Controller, Post } from '@nestjs/common';
import * as dto from 'src/shared/dtos';
import { AuthService } from '../services/auth.service';
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() body: dto.CreateUserDTO): Promise<any> {
    try {
      const user = await this.authService.signUp({ body });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
