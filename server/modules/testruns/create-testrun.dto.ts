import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsNotEmpty, IsBoolean, IsArray, IsISO8601 } from 'class-validator';

export class CreateTestrunDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly builds?: Array<string>;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly environments?: Array<string>;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly platforms?: Array<string>;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly testcases?: Array<string>;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly progress?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly archieved?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  readonly startDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  readonly endDate?: Date;

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
