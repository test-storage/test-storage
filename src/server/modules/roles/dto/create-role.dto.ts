import { IsString, IsInt } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
