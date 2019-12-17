import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsISO8601, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateNotificationDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly entity: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly action: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly senderId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly recipientId?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly isRead?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  readonly created?: Date;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  readonly updated?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly createdBy?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly updatedBy?: string;
}

