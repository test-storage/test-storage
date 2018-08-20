import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDefined, IsBoolean } from 'class-validator';

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

  @ApiModelProperty({ type: Boolean })
  @IsDefined()
  @IsBoolean()
  @IsNotEmpty()
  readonly rememberMe: boolean;
}
