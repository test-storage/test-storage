import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateTestsuiteDto {

  @IsString()
  readonly _id?: string;

  @IsString()
  @IsNotEmpty()
  readonly parentId: string;

  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @IsString()
  readonly status?: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  readonly created?: string;
  readonly updated?: string;

  @IsString()
  readonly createdBy?: string;

  @IsString()
  readonly updatedBy?: string;
}
