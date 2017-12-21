import { IsString, IsInt } from 'class-validator';

export class CreateTestcaseDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}
