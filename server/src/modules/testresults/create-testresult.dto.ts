import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsISO8601, IsArray } from 'class-validator';

export class CreateTestResultDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly testrunId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly testcaseId: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly builds?: Array<string>;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly platforms?: Array<string>;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly status?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly notes?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly attachments?: Array<string>;

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
