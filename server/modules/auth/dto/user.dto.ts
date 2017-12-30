import { IsString, IsInt, IsNotEmpty, IsDefined } from 'class-validator';

export class UserDto {

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
