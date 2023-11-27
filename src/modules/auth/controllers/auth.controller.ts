import { Body, Controller, Post } from '@nestjs/common';
import * as dto from 'src/shared/dtos';
import { AuthService } from '../services/auth.service';
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() body: dto.CreateUserDTO): Promise<any> {
    const { user } = await this.authService.signUp({ body });
    // TODO: send email verification using a queue system like bull
    //  const link = await this.authService.createVerifyEmailLink({ email: user.email });
    return {
      ...user,
      meta: { message: 'User created successfully' },
    };
  }

  @Post('/sign-in')
  async signIn(@Body() body: dto.SignInDTO): Promise<any> {
    const { accessToken, refreshToken, user } = await this.authService.signIn({ body });
    return {
      ...user,
      accessToken,
      refreshToken,
      meta: { message: 'User created successfully' },
    };
  }
  @Post('/recover-password')
  async recoverPassword(@Body() body: dto.RecoverPasswordDTO): Promise<any> {
    const link = await this.authService.recoverPassword({ body });
    console.log(link);
    // TODO: send email verification using a queue system like bull
  }
  @Post('/verify-email')
  async verifyEmail(@Body() body: dto.VerifyEmailDTO): Promise<any> {
    await this.authService.verifyEmail({ body });
    return { meta: { message: 'The email was verified.' } };
  }
  @Post('/reset-password')
  async resetPassword(@Body() body: dto.ResetPasswordDTO): Promise<any> {
    await this.authService.resetPassword({ body });
    return { meta: { message: 'The password was changed' } };
  }
}
