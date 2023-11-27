import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RecoverPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
