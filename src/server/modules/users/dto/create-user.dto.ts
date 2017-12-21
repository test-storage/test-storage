import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly firstName: string;
}
