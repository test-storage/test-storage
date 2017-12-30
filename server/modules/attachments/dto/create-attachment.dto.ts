import { IsString, IsInt } from 'class-validator';

export class CreateAttachmentDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
