import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsISO8601, IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly manufacturer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly deviceModel: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly os: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly osVersion: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly location?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly hostname?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly inventoryId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly serialNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly sku?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly assignedTo?: Array<string>; // User id

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

