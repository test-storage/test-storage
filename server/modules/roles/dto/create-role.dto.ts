import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateRoleDto {

  @ApiModelProperty({ type: String })
  @IsString()
  readonly name: string;

  @ApiModelProperty({ type: String })
  @IsString()
  readonly description: string;
}
