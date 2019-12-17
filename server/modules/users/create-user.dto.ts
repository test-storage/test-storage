import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsISO8601 } from 'class-validator';

export class CreateUserDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly _id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly active: boolean;

  @ApiProperty()
  @IsOptional()
  readonly photo?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly avatarColor?: number;

  @ApiProperty()
  @IsOptional()
  readonly workInfo?: object;

  @ApiProperty()
  @IsOptional()
  readonly social?: object;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @ApiProperty()
  @IsOptional()
  readonly userGroups?: Array<string>;

  @ApiProperty()
  @IsOptional()
  readonly projects?: Array<string>;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  readonly created?: Date;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  readonly updated?: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly createdBy?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly updatedBy?: string;
}
