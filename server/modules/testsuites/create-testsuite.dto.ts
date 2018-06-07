import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsISO8601 } from 'class-validator';

export class CreateTestsuiteDto {

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly parentId: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiModelPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  readonly order?: number;

  @ApiModelPropertyOptional({ type: Date })
  @IsOptional()
  @IsISO8601()
  readonly created?: Date;

  @ApiModelPropertyOptional({ type: Date })
  @IsOptional()
  @IsISO8601()
  readonly updated?: Date;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly createdBy?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly updatedBy?: string;
}
