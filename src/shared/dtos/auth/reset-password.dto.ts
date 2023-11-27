import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'src/shared/regex';

export class ResetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @IsString()
  @Matches(PASSWORD_REGEX)
  password: string;
}
