import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsDefined } from 'class-validator';

export class UserDto {

  @ApiModelProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiModelProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
