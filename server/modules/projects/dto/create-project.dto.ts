import { IsString, IsInt, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateProjectDto {

  @IsString()
  readonly _id?: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsBoolean()
  readonly enabled?: boolean;

  readonly created?: string;
  readonly updated?: string;
  // manager?: string; point to user

  @IsString()
  readonly createdBy?: string;

  @IsString()
  readonly updatedBy?: string;
}
