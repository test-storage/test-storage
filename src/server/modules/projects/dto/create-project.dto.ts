import { IsString, IsInt } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
