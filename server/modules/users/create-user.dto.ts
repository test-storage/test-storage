import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {

  @ApiModelPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
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

  @ApiModelProperty({ type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  readonly active: boolean;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  readonly photo?: string;
  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  readonly workInfo?: any;
  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  readonly social?: any;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  readonly userGroups?: Array<string>;
  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  readonly projects?: Array<string>;
  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  readonly created?: string;
  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  readonly updated?: string;
  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  readonly createdBy?: string;
  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  readonly updatedBy?: string;
}
