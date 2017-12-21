import { IsString, IsInt } from 'class-validator';

export class CreateTestsuiteDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}
