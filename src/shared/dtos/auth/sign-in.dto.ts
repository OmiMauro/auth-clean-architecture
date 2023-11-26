import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'src/shared/regex';

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password too weak! Must have at least 6 characters, 1 uppercase, 1 lowercase and 1 number.',
  })
  password: string;
}
