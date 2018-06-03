import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsDate } from 'class-validator';

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

  @ApiModelPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  readonly avatarColor?: number;

  @ApiModelPropertyOptional({ type: Object })
  @IsOptional()
  readonly workInfo?: object;

  @ApiModelPropertyOptional({ type: Object })
  @IsOptional()
  readonly social?: object;

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

  @ApiModelPropertyOptional({ type: Date })
  @IsString()
  @IsOptional()
  readonly created?: Date;

  @ApiModelPropertyOptional({ type: Date })
  @IsString()
  @IsOptional()
  readonly updated?: Date;

  @ApiModelPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly createdBy?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly updatedBy?: string;
}
