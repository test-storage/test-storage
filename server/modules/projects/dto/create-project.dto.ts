import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateProjectDto {

  @ApiModelPropertyOptional({ type: String})
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

  @ApiModelPropertyOptional({ type: Boolean})
  // @IsBoolean()
  readonly enabled?: boolean;

  @ApiModelPropertyOptional({ type: String})
  readonly created?: string;
  @ApiModelPropertyOptional({ type: String})
  readonly updated?: string;
  // manager?: string; point to user

  @ApiModelPropertyOptional({ type: String})
  // @IsString()
  readonly createdBy?: string;

  @ApiModelPropertyOptional({ type: String})
  // @IsString()
  readonly updatedBy?: string;
}
