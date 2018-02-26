import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @ApiModelPropertyOptional({ type: String})
  @IsString()
  readonly _id?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiModelPropertyOptional({ type: String})
  readonly photo?: string;
  @ApiModelPropertyOptional({ type: String})
  readonly workInfo?: any;
  @ApiModelPropertyOptional({ type: String})
  readonly social?: any;
  @ApiModelPropertyOptional({ type: String})
  readonly userGroups?: Array<string>;
  @ApiModelPropertyOptional({ type: String})
  readonly projects?: Array<string>;
  @ApiModelPropertyOptional({ type: String})
  readonly created?: string;
  @ApiModelPropertyOptional({ type: String})
  readonly updated?: string;
  @ApiModelPropertyOptional({ type: String})
  readonly createdBy?: string;
  @ApiModelPropertyOptional({ type: String})
  readonly updatedBy?: string;
}
