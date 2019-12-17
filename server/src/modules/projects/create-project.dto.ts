import { IsString, IsInt, IsNotEmpty, IsBoolean, IsOptional, IsISO8601 } from 'class-validator';

export class CreateProjectDto {

  @IsOptional()
  @IsString()
  readonly _id?: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly image?: string;

  @IsInt()
  @IsOptional()
  readonly avatarColor?: number;

  @IsBoolean()
  @IsOptional()
  readonly enabled?: boolean;

  @IsISO8601()
  @IsOptional()
  readonly created?: Date;

  @IsISO8601()
  @IsOptional()
  readonly updated?: Date;
  // manager?: string; point to user

  @IsString()
  @IsOptional()
  readonly createdBy?: string;

  @IsString()
  @IsOptional()
  readonly updatedBy?: string;
}
