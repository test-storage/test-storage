import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsISO8601 } from 'class-validator';

export class CreateTestsuiteDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly parentId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly order?: number;

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
