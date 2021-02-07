import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDefined, IsBoolean, IsOptional } from 'class-validator';

export class UserDto {

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  // @IsDefined()
  @IsOptional()
  @IsBoolean()
  // @IsNotEmpty()
  readonly rememberMe: boolean;
}
