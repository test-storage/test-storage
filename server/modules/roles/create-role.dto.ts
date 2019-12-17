import { IsString, IsOptional } from 'class-validator';

export class CreateRoleDto {

  @IsOptional()
  @IsString()
  readonly _id?: string;

  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
