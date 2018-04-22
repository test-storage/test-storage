import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateDeviceDto {

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  readonly manufacturer: string;

  @ApiModelProperty({ type: String })
  @IsString()
  readonly model: string;

  @ApiModelProperty({ type: String })
  @IsString()
  readonly os: string;

  @ApiModelProperty({ type: String })
  @IsString()
  readonly osVersion: string;

  @ApiModelProperty({ type: Number })
  @IsInt()
  readonly type: DeviceType;

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
  readonly sku?: string;

  @ApiModelProperty({ type: Array })
  @IsArray()
  readonly assignedTo: Array<string>; // User id
}

export enum DeviceType {
  MOBILE,
  TABLET,
  SERVER,
  HARDWARE,
  VM,
  CONTAINER
}
