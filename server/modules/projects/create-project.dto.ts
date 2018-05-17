import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsBoolean, IsOptional, IsDate } from 'class-validator';

export class CreateProjectDto {

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiModelPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly image?: string;

  @ApiModelPropertyOptional({ type: Number })
  @IsInt()
  @IsOptional()
  readonly avatarColor?: number;

  @ApiModelPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly enabled?: boolean;

  @ApiModelPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  readonly created?: Date;
  @ApiModelPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  readonly updated?: Date;
  // manager?: string; point to user

  @ApiModelPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly createdBy?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly updatedBy?: string;
}
