import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UuidDTO {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  uuid: string;
}
