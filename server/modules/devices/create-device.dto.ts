import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsISO8601, IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly manufacturer: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly model: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly os: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly osVersion: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly location?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly hostname?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly inventoryId?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly serialNumber?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly sku?: string;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly assignedTo?: Array<string>; // User id

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

