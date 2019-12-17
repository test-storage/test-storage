import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsBoolean, IsNumber, IsOptional, IsISO8601 } from 'class-validator';

export class CreateUserStoryDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly key?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly priority?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly order?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly actor: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly testCases?: Array<string>;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly tags?: Array<string>;

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

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly isAutomated?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly estimate?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly status?: string;
}
